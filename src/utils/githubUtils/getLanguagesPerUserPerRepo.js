const { fetchOrgNames, authenticate } = require('./githubAuth');

const redis = require('redis');
const client = redis.createClient();
const cron = require('node-cron');

client.connect();

async function saveUserData(key, username, data) {
  const value = JSON.stringify(data);

  client.hSet(key, username, value, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Data saved for user: ${username}`);
    }
  });
}

const getUserLanguageUsage = async (user) => {
  const orgNames = await fetchOrgNames();
  const authenticatedInstances = await authenticate(orgNames);
  const languageUsage = {};

  const today = new Date();
  today.setDate(today.getDate() - 10);
  const lastYear = new Date(today.setFullYear(today.getFullYear() - 1));
  const monthNames = 
  ['January', 'February', 'March', 
    'April', 'May', 'June', 'July', 
    'August', 'September', 'October', 
    'November', 'December'];
  
  orgNames.forEach(async (org) => {
    const octokit = await authenticatedInstances[org];

    // modify this to get data for all instance of all orgs
    const repos = await octokit.paginate(octokit.repos.listForOrg, {
      org: org,
      type: 'all',
      per_page: 100,
    });

    // Filter repos to only include those where the user has made contributions in the past year
    const userRepos = repos.filter(async (repo) => {
      const stats = await octokit.repos.getContributorsStats({
        owner: org,
        repo: repo.name,
      });
      if (stats.data &&
      Array.isArray(stats.data))
        return (stats.data.some(
          (contributor) =>
            contributor.author.login === user && new Date(contributor.weeks[contributor.weeks.length - 1].w) > lastYear
        )
        );
    });
    // console.log(userRepos);
    for (const repo of userRepos) {
      const languages = await octokit.repos.listLanguages({
        owner: org,
        repo: repo.name,
      });
      const contributors = await octokit.repos.listContributors({
        owner: org,
        repo: repo.name,
      });
      if (!contributors.data || !languages.data) {
        continue;
      }
      const totalContributions = contributors.data.reduce(
        (total, contributor) => total + contributor.contributions,
        0
      );
      const userContributor = contributors.data.find(
        (contributor) => contributor.login === user
      );
      if (userContributor) {
        const userContributions = userContributor.contributions;
        Object.entries(languages.data).forEach(([language, bytes]) => {
          let monthIndex = new Date(repo.pushed_at).getMonth();
          // eslint-disable-next-line no-unused-vars
          let monthName = monthNames[monthIndex];
          if (!languageUsage[language]) {
            languageUsage[language] = new Array(12).fill(0);
          }
          languageUsage[language][monthIndex] += (bytes * userContributions) / totalContributions;
        });
      }
      const key = 'languageUsage';
      const username = `${user}`;
      const data = languageUsage;
      await saveUserData(key, username, data);
    }
  });

  // console.log(languageUsage);
};

// getUserLanguageUsage('13balkar').then(() => {
//   console.log('done');
// });
// getUserLanguageUsage('13balkar').then(() => {
//   console.log('loading');
// });


// console.log(getManagerLanguages('SNEHA1009TRIVEDI'));

async function languageJob() {

  //   // cron.schedule('*/30 * * * * *', async () => {
  // cron job to run every morning at 3:00 am
  // cron job to run every morning at 3:00 am
  // cron.schedule('0 3 * * *', async () => {
  cron.schedule('0 3 * * *', async () => {
    console.log('redis updated');
    const users = await client.hKeys('languageUsage');
    for (const user of users) {
      await getUserLanguageUsage(user);
    }
  });
}


module.exports = {
  getUserLanguageUsage,
  languageJob
};

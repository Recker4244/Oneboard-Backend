const {authenticate} = require('./githubAuth');
// const org = process.env.ORG_NAME;
const db = require('../../models');
const cron = require('node-cron');
const redis = require('redis');
const client = redis.createClient();
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

const getManagerLanguageUsage = async (username) => {
  let languageUsage = {};

  // get all project_ids for the user using associations
  const user = await db.users.findOne({
    where: {
      username
    },
    include: [{
      model: db.teams,
      as: 'teams',
      attributes: ['project_id']
    }]
  });

  // get links using project_ids from above
  const links = await db.links.findAll({
    where: {
      project_id: user.teams.map(team => team.project_id)
    }
  });

  // filter out links that are github links
  const githubLinks = links.filter(link => link.url.includes('github.com'));

  // get all languages for each github link
  const promises = githubLinks.map(async (link) => {
    let repo = link.url.split('github.com/')[1];
    // remove .git from repo name
    repo = repo.split('.git')[0];
    // console.log(repo);
    const [owner, repoName] = repo.split('/');
    const octokit = await authenticate([owner]);

    const { data: languages } = await octokit[owner].repos.listLanguages({
      owner,
      repo: repoName
    });
    const date = new Date(link.createdAt);
    const month = date.getMonth();
    Object.entries(languages).forEach(([language, bytes]) => {
      if (!languageUsage[language]) {
        languageUsage[language] = new Array(12).fill(0);
      }
      languageUsage[language][month] += bytes;
    });
  });

  await Promise.all(promises);

  //   return languageUsage;
  const key = 'managerLanguages';
  const data = languageUsage;
  await saveUserData(key, username, data);
};

// add mock data to redis
const mockInsert = async () => {
  const mockData = {
    'JavaScript': [ 0, 0, 3752, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    'CSS': [ 0, 0, 126, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    'HTML': [ 0, 0, 604, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    'TypeScript': [ 0, 0, 427, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    'C++': [ 23, 23, 80, 32, 23, 78, 32, 12, 6, 5, 43, 122 ],
    'Python': [ 89, 44, 121, 43, 233, 54, 122, 24, 34, 65, 43, 11 ],
    'Shell': [ 0, 0, 17, 0, 0, 16, 0, 34, 0, 8676, 0, 102 ],
    'C': [ 342, 32, 16, 0, 76, 0, 65, 466, 5, 5, 34, 100 ],
  };
  client.hSet('managerLanguages', 'rohit', JSON.stringify(mockData), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Data saved for user: rohit');
    }
  });
};

// mockInsert();

// cron.schedule('*/30 * * * * *', async () => {
// cron job to run every morning at 3:00 am
const managerLanguagesJob = () => {
  cron.schedule('0 3 * * *', async () => {
    console.log('redis updated');
    const users = await client.hKeys('managerLanguages');
    for (const user of users) {
      await getManagerLanguageUsage(user);
    }
  });
};
  
// getManagerLanguageUsage('rohit').then((data) => console.log(data));

module.exports = {
  getManagerLanguageUsage,
  managerLanguagesJob
};
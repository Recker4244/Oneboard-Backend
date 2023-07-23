// const githubAuth = require('./githubAuth');
const cron = require('node-cron');
const redis = require('redis');
const {fetchOrgNames, authenticate} = require('./githubAuth');

const client = redis.createClient();
client.connect();

const getHeatMap = async () => {
  const orgNames = await fetchOrgNames();
  const authenticatedInstances = await authenticate(orgNames);
  // console.log('authenticatedInstances', authenticatedInstances);
  let commitCount = {};
  orgNames.forEach(async (org) => {
    // console.log('org', org);
    const octokit = await authenticatedInstances[org];
    // console.log('octokit', octokit);
    // set data for 10 days ago
    const date = new Date();
    date.setDate(date.getDate() - 10);
    date.setMonth(date.getMonth() - 12);
    const repoPromises = [];

    for (let i = 0; i < 12; i++) {
      repoPromises.push(octokit.paginate(octokit.rest.repos.listForOrg, {
        org: org,
        type: 'all',
      }));
    }

    // console.log('return repoPromises');
    const reposByMonth = await Promise.all(repoPromises);

    for (let i = 0; i < 12; i++) {
      date.setMonth(date.getMonth() + 1);
      let month = date.toLocaleString('default', { month: 'long' });
      if(commitCount[month]) commitCount[month] += 0;
      else       
        commitCount[month] = 0;
      // commitCount[month] = 0;
      const commitPromises = [];

      for (const repo of reposByMonth[i]) {
        commitPromises.push(octokit.paginate(octokit.repos.listCommits, {
          owner: org,
          repo: repo.name,
          since: new Date(date.getFullYear(), date.getMonth(), 1).toISOString(),
          until: new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString()
        }));
      }

      const commitsByRepo = await Promise.all(commitPromises);
      // console.log('return commitPromises');

      for (const commits of commitsByRepo) {
        commitCount[month] += commits.length;
      }
      // console.log('setting commitcount for org', org, 'month', month, 'to', commitCount[month]);
      client.hSet('commitCount', month, commitCount[month]);
    }
    
    // console.log('commitCount', commitCount);
  });
};


// schedule a cron job that runs on the first day of every month at midnight
cron.schedule('0 0 1 * *', () => {
  // cron.schedule('*/10 * * * * *', () => {
  getHeatMap.then(() => console.log('Updated heatmap for historic months'));
});


// getHeatMap();

module.exports = getHeatMap;
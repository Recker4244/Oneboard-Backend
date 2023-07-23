const {authenticate} = require('../utils/githubUtils/githubAuth');
// const cron = require('node-cron');
// const redis = require('redis');
const db = require('../models');

const getCommitsDev = async (username, project_id) => {
  // get all gitub links for the project_id from links table
  const links = await db.links.findAll({
    where: {
      project_id
    }
  });

  // get github username for the user
  const githubUser = await db.users.findOne({
    where: {
      username
    }
  });

  // filter out links that are github links
  const githubLinks = links.filter(link => link.url.includes('github.com')&& link.link_name!=='project');

  // get total commits for each github link
  const promises = githubLinks.map(async (link) => {
    let repo = link.url.split('github.com/')[1];
    // remove .git from repo name if it exists
    if(repo.includes('.git')) {
      repo = repo.split('.git')[0];
    }
    const [owner, repoName] = repo.split('/');
    console.log('owner', owner);
    console.log('repoName', repoName);
    const octokit = await authenticate([owner]);
    let commits = [];
    let page = 1;
    let per_page = 100;
    let response = null;
    
    do {
      response = await octokit[owner].repos.listCommits({
        owner,
        repo: repoName,
        per_page,
        page,
      });

      commits = commits.concat(response.data);
      page++;
    } while (response.data.length === per_page);
    
    return commits;
  });
    
  const commits = await Promise.all(promises);
  // count total commits
  const totalCommits = commits.reduce((acc, curr) => {
    return acc + curr.length;
  }, 0);

  // get total commits for each user
  const userCommits = commits.reduce((acc, curr) => {
    // if author is not null and author login is the same as the github username
    const user = curr.filter(commit => commit.author && commit.author.login === githubUser.github);
    return acc + user.length;
  }
  , 0);

  return {
    totalCommits,
    userCommits
  };
};

module.exports = getCommitsDev;
    
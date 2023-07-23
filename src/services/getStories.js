const {authenticate} = require('../utils/githubUtils/githubAuth');
const db = require('../models');

const getStories = async (username, project_id) => {
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
  const githubLinks = links.filter(link => link.url.includes('github.com')&&link.link_name!=='project');
  
  // get total commits for each github link
  const promises = githubLinks.map(async (link) => {
    let repo = link.url.split('github.com/')[1];
    // remove .git from repo name if it exists
    if(repo.includes('.git')) {
      repo = repo.split('.git')[0];
    }
  
    // console.log(repo);
    const [owner, repoName] = repo.split('/');
    console.log('owner', owner);
    console.log('repoName', repoName);
    const octokit = await authenticate([owner]);

    // get all open issues for all repos for the user
    let openIssues = [];
    let issuePage = 1;
    let issuePerPage = 100;
    let issueResponse = null;

    do {
      issueResponse = await octokit[owner].issues.listForRepo({
        owner,
        repo: repoName,
        state: 'open',
        per_page: issuePerPage,
        page: issuePage
      });


      openIssues = openIssues.concat(issueResponse.data);
      issuePage++;
    } while (issueResponse.data.length === issuePerPage);
    
    return openIssues;
  });

  const openIssues = await Promise.all(promises);

  // filter out issues that are not assigned or created by the user
  const flattenedOpenIssues = [].concat(...openIssues);
  const filteredOpenIssues = flattenedOpenIssues.filter(issue => issue.user.login == githubUser.github || issue.assignees.login == githubUser.github);
  
  return {
    openStories: filteredOpenIssues.length
  };
};
  
module.exports = getStories;
      
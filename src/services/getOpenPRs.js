const {authenticate} = require('../utils/githubUtils/githubAuth');
const db = require('../models');

const getOpenPRs = async (username, project_id) => {
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

    // get all open PRs for all repos for the user
    let openPRs = [];
    let prPage = 1;
    let prPerPage = 100;
    let prResponse = null;

    do {
      prResponse = await octokit[owner].pulls.list({
        owner,
        repo: repoName,
        state: 'open',
        per_page: prPerPage,
        page: prPage,
      });

      openPRs = openPRs.concat(prResponse.data);
      prPage++;
    } while (prResponse.data.length === prPerPage);

    return openPRs;
  });

  const openPRs = await Promise.all(promises);
  const flattenedOpenPRs = [].concat(...openPRs);
  const filteredOpenPRs = flattenedOpenPRs.filter(pr => pr.user.login == githubUser.github );

  return {
    openPRs: filteredOpenPRs.length,
  };
};

// getOpenPRs('siddharth', '27fdc8eb-8d49-4e97-84ee-9a87bad0061d').then(() => {
//   console.log('done');
// });

module.exports = getOpenPRs;
    
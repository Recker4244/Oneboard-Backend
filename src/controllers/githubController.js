const getCommitsDev = require ('../services/getCommitsDev');
const getOpenPRs = require('../services/getOpenPRs');
const getStories = require('../services/getStories');

const devCommitsController = async (req, res) => {
  const { user, project_id } = req.params;
  // console.log('user', user);
  // console.log('project_id', project_id);
  const commits = await getCommitsDev(user, project_id);
  res.json(commits);
};

const openPRsController = async (req, res) => {
  const { user, project_id } = req.params;
  const openPRs = await getOpenPRs(user, project_id);
  res.json(openPRs);
};

const openIssuesController = async (req, res) => {
  const { user, project_id } = req.params;
  const openStories = await getStories(user, project_id);
  res.json(openStories);
};

module.exports = {
  devCommitsController,
  openPRsController,
  openIssuesController,
};
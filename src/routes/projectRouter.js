
const router = require('express').Router();

const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  getProjectsCountByUsername,
  getProjectTimelineStoryPoints,
  getProjectTimeline,
  getEffortDistribution,
  getUsersCountByUsername,
  getTeamDistribution,
  getTeamVelocity,
  getDeveloperVelocity,
  getProjectDetailsById,
  getProjectsByUsername,
  postChargeCodes,
  getChargeCodes,
  updateChargeCodes,
  getStoryCountByUser,
  getRepos,
  editProject,
  getRollOffDate,
  getWorkloadBarometer } = require('../controllers/projectController');

router.post('/create', createProject);
router.get('/', getAllProjects);
router.get('/:username', getProjectsByUsername);
router.get('/:project_id', getProjectById);
router.get('/rollOfDate/:project_id/:username', getRollOffDate);
router.get('/:project_id/team_velocity', getTeamVelocity);
router.get('/:project_id/developer_velocity', getDeveloperVelocity);
router.get('/:project_id/timeline', getProjectTimeline);
router.get('/:project_id/story_points', getProjectTimelineStoryPoints);
router.get('/:project_id/effort_distribution', getEffortDistribution);
router.get('/:project_id/team_distribution', getTeamDistribution);
router.get('/count/:username', getProjectsCountByUsername);
router.patch('/update/:project_id', updateProjectById);
router.delete('/delete/:project_id', deleteProjectById);
router.get('/users/count', getUsersCountByUsername);
router.get('/project_details/:project_id', getProjectDetailsById);
router.post('/chargeCodes/:projectID', postChargeCodes);
router.get('/chargeCodes/:projectID', getChargeCodes);
router.put('/chargeCodes/:projectID', updateChargeCodes);
router.get('/repos/:projectID', getRepos);
router.patch('/edit/:projectID', editProject);
router.get('/story_count/:username', getStoryCountByUser);
router.get('/workload_barometer/:username', getWorkloadBarometer);

module.exports = router;

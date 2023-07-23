const router = require('express').Router();

// const githubUtils = require('../utils/githubUtils/');
// const getHeatMap = require('../utils/githubUtils/getHeatMap');
const heatmapController = require('../controllers/heatmapController');
const { languagesController, managerLanguagesController } = require('../controllers/languagesController');
const githubController = require('../controllers/githubController');

router.get('/heatmap', heatmapController);

router.get('/languages/:user', languagesController);

router.get('/languages/manager/:user', managerLanguagesController);

router.get('/commits/:user/:project_id', githubController.devCommitsController);

router.get('/prcount/:user/:project_id', githubController.openPRsController);

router.get('/stories/:user/:project_id', githubController.openIssuesController);


module.exports = router;
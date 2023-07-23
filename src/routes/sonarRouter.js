const Router = require('express').Router();
const { getSuccess, getDetailedReport } = require('../controllers/sonarController');

Router.get('/', getSuccess);
Router.get('/detail', getDetailedReport);

module.exports = Router;
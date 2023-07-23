const Router = require('express').Router();
const roleInProjectController = require('../controllers/roleInProjectsController.js');

Router.get('/', roleInProjectController);

module.exports = Router;
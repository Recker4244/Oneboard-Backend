const Router = require('express').Router();
const personalCostController = require('../controllers/personalCostController');

Router.post('/:project_id', personalCostController.createPersonalCost);

Router.get('/:project_id', personalCostController.getPersonalCosts);

// Router.put('/:id', personalCostController.updatePersonalCost);

module.exports = Router;

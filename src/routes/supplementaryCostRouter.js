const Router = require('express').Router();
const supplementaryCostController = require('../controllers/supplementaryCostController');

Router.post('/:project_id', supplementaryCostController.createSupplementaryCost);

Router.get('/:project_id', supplementaryCostController.getSupplementaryCosts);

// Router.put('/:id', supplementaryCostController.updateSupplementaryCost);

module.exports = Router;
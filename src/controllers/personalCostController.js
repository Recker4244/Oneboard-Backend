const personalCostService = require('../services/personalCostService');

const createPersonalCost = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { username, cost } = req.body;
    const newPersonalCost = await personalCostService.createPersonalCost(
      project_id,
      username,
      cost
    );
    return res.status(201).json({
      status: 201,
      data: newPersonalCost,
      message: 'Succesfully Created Personal Cost'
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const getPersonalCosts = async (req, res) => {
  try {
    const { project_id } = req.params;
    const personalCosts = await personalCostService.getPersonalCosts(project_id);
    if (personalCosts.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Personal Costs Not Found'
      });
    }
    return res.status(200).json({
      status: 200,
      data: personalCosts,
      message: 'Succesfully Personal Costs Recieved'
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = { createPersonalCost, getPersonalCosts };

const supplementaryCostSevice = require('../services/supplementaryCostService');

const createSupplementaryCost = async (req, res) => {
  try {
    const { project_id } = req.params;
    const { cost_type, amount } = req.body;
    const newSupplementaryCost = await supplementaryCostSevice.createSupplementaryCost(
      project_id,
      cost_type,
      amount
    );
    return res.status(201).json({
      status: 201,
      data: newSupplementaryCost,
      message: 'Succesfully Created Supplementary Cost'
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const getSupplementaryCosts = async (req, res) => {
  try {
    const { project_id } = req.params;
    const supplementaryCosts = await supplementaryCostSevice.getSupplementaryCosts(project_id);
    if (supplementaryCosts.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Supplementary Costs Not Found'
      });
    }
    return res.status(200).json({
      status: 200,
      data: supplementaryCosts,
      message: 'Succesfully Supplementary Costs Recieved'
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

// const updateSupplementaryCost = async (req, res) => {
// try {
//     const { id } = req.params;
//     const newSupplementaryCost = req.body;
//     const updated = await supplementaryCostSevice.updateSupplementaryCost(id, newSupplementaryCost);
//     if (updated[0] === 0) {
//     return res.status(404).json({
//         status: 404,
//         message: 'Supplementary Cost Not Found',
//     });
//     }
//     return res.status(200).json({
//     status: 200,
//     data: updated[1],
//     message: 'Succesfully Updated Supplementary Cost',
//     });
// } catch (error) {
//     return res.status(500).json({ status: 500, message: error.message });
// }
// }

module.exports = {
  createSupplementaryCost,
  getSupplementaryCosts
  // updateSupplementaryCost
};

const httpErrors = require('../../errors/httpErrors');
const sonarService = require('../services/sonarServices');

const getSuccess = async (req, res) => {
  console.log('getSuccess');
  try {
    const { project_id } = req.query;
    const sonarReport = await sonarService.getSuccess(project_id);
    res.status(200).json(sonarReport);
  }
  catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

const getDetailedReport = async (req, res) => {
  try {
    const { project_id } = req.query;
    const sonarReport = await sonarService.getDetailedReport(project_id);
    res.status(200).json(sonarReport);
  }
  catch (err) {
    if (err instanceof httpErrors) {
      res.status(err.code).json({ message: err.message });
    }
    else {
      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

module.exports = { getSuccess, getDetailedReport };
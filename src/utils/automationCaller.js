const sendPulseMail = require('./pulseMailer');
const getHeatMap = require('./githubUtils/getHeatMap');
const { languageJob } = require('./githubUtils/getLanguagesPerUserPerRepo');
const { managerLanguagesJob } = require('./githubUtils/getManagerLanguages');
const callAutomation = async ()=>{
  sendPulseMail();
  getHeatMap();
  await languageJob();
  await managerLanguagesJob();
};

module.exports = callAutomation;
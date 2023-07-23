const { links } = require('../models/index');
const axios = require('axios');
const httpErrors = require('../../errors/httpErrors');
const getSuccess = async (project_id) => {
  const sonarReport = await links.findAll({ where: { project_id: project_id }, attributes: ['base_url', 'sonar_project_key', 'token'] });
  let result = true;
  try {
    for (let i = 0; i < sonarReport.length; i++) {
      sonarReport[i] = sonarReport[i].dataValues;
      if (sonarReport[i].sonar_project_key === null || sonarReport[i].base_url === null || sonarReport[i].token === null) {
        continue;
      }
      const sonarUrl = `${sonarReport[i].base_url}/api/qualitygates/project_status?projectKey=${sonarReport[i].sonar_project_key}`;
      const headers = { 'Authorization': `Basic ${sonarReport[i].token}` };
      const sonarResponse = await axios.get(sonarUrl, { headers: headers });
      result = result && (sonarResponse.data.projectStatus.status === 'OK');
    }
    return result;
  }
  catch (err) {
    return true;
  }

};

const getDetailedReport = async (project_id) => {
  const sonarReport = await links.findAll({ where: { project_id: project_id }, attributes: ['link_name', 'url', 'base_url', 'sonar_project_key', 'token'] });
  if (!sonarReport) {
    throw new httpErrors(404, 'No Sonar Report found');
  }
  const result = [];
  for (let i = 0; i < sonarReport.length; i++) {
    sonarReport[i] = sonarReport[i].dataValues;
    const headers = { 'Authorization': `Basic ${sonarReport[i].token}` };
    if (sonarReport[i].sonar_project_key === null || sonarReport[i].base_url === null || sonarReport[i].token === null) {
      result.push({
        link_name: sonarReport[i].link_name,
        git_url: sonarReport[i].url,
        sonar_url: null,
        reliability: null,
        security: null,
        maintainability: null,
        security_review: null
      });
    }
    else {
      try {
        const reliabilityLink = `${sonarReport[i].base_url}/api/measures/component?component=${sonarReport[i].sonar_project_key}&metricKeys=reliability_rating`;
        const securityLink = `${sonarReport[i].base_url}/api/measures/component?component=${sonarReport[i].sonar_project_key}&metricKeys=security_rating`;
        const maintainabilityLink = `${sonarReport[i].base_url}/api/measures/component?component=${sonarReport[i].sonar_project_key}&metricKeys=sqale_rating`;
        const securityReviewLink = `${sonarReport[i].base_url}/api/measures/component?component=${sonarReport[i].sonar_project_key}&metricKeys=security_review_rating`;
        const reliabilityResponse = await axios.get(reliabilityLink, { headers: headers });
        const securityResponse = await axios.get(securityLink, { headers: headers });
        const maintainabilityResponse = await axios.get(maintainabilityLink, { headers: headers });
        const securityReviewResponse = await axios.get(securityReviewLink, { headers: headers });
        result.push({
          link_name: sonarReport[i].link_name,
          reliability: reliabilityResponse.data.component.measures[0].value,
          security: securityResponse.data.component.measures[0].value,
          maintainability: maintainabilityResponse.data.component.measures[0].value,
          security_review: securityReviewResponse.data.component.measures[0].value,
          sonar_url: `${sonarReport[i].base_url}/dashboard?id=${sonarReport[i].sonar_project_key}`,
          git_url: sonarReport[i].url
        });
      }
      catch (err) {
        result.push({
          link_name: sonarReport[i].link_name,
          git_url: sonarReport[i].url,
          sonar_url: null,
          reliability: null,
          security: null,
          maintainability: null,
          security_review: null
        });
      }
    }
  }
  return result;
};

module.exports = { getSuccess, getDetailedReport };

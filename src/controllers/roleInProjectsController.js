const services = require('../services/roleInProjects');

async function roleInProjects(req, res){
  res.status(200).send(await services(req.user.username));
}

module.exports = roleInProjects;
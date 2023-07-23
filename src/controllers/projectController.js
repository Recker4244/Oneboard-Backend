// addMember, getTeam  getTeamByProjectId, getTeamByUserName, getTeamByRole
const HTTPErrors = require('../../errors/httpErrors');
const projectService = require('../services/projectService');

// create a new project for project_details model 

const createProject = async (req, res) => {

  try {
    const project = await projectService.createProject(req.body);
    return res.status(201).json(project);
  } catch (error) {
    console.log(error);
    if (error instanceof HTTPErrors) {
      return res.status(error.code).json({ 'message': error.message });
    } else
      return res.status(500).json({ message: error.message });
  }
};

// get all projects for project_details model

const getAllProjects = async (req, res) => {
  try {
    const page = req.query.page;
    const rowsPerPage = req.query.rowsPerPage;
    const username = req.query.username;
    const projects = await projectService.getAllProjects(page, rowsPerPage, username);
    res.status(200).json(projects);
  } catch (error) {
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    } else
      res.status(500).json({ message: error.message });
  }
};
const getProjectsByUsername = async (req, res) => {
  try {
    const page = req.query.page;
    const rowsPerPage = req.query.rowsPerPage;
    const projects = await projectService.getProjectsByUsername(req.params.username, page, rowsPerPage);
    res.status(200).json(projects);
  } catch (error) {
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    } else
      res.status(500).json({ message: error.message });
  }
};

// get a project by project_id for project_details model

const getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.project_id);
    res.status(200).json(project);
  } catch (error) {
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    } else
      res.status(500).json({ message: error.message });
  }
};

// get a project by username for project_details model
const getProjectsCountByUsername = async (req, res) => {
  try {
    console.log(req.params.username);
    const project = await projectService.getProjectByUsername(req.params.username);
    res.status(200).json(project);
  } catch (error) {
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// update a project by project_id for project_details model

const updateProjectById = async (req, res) => {
  try {
    const project = await projectService.updateProjectById(req.params.project_id, req.body);
    res.status(200).json(project);
  }
  catch (error) {
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// delete a project by project_id for project_details model

const deleteProjectById = async (req, res) => {
  try {
    const project = await projectService.deleteProjectById(req.params.project_id);
    res.status(200).json(project);
  } catch (error) {
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const getTeamVelocity = async (req, res) => {
  try {
    const teamVelocity = await projectService.getTeamVelocity(req.params.project_id);
    return res.status(200).json(teamVelocity);
  } catch (error) {

    if (error instanceof HTTPErrors) {
      return res.status(error.code).json({ 'message': error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const getDeveloperVelocity = async (req, res) => {
  try {
    const developerVelocity = await projectService.getDeveloperVelocity(req.params.project_id, req.query.username);
    return res.status(200).json(developerVelocity);
  } catch (error) {

    if (error instanceof HTTPErrors) {
      return res.status(error.code).json({ 'message': error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const getWorkloadBarometer = async (req, res) => {
  try {
    const workloadBarometer = await projectService.getWorkloadBarometer(req.params.username);
    return res.status(200).json(workloadBarometer);
  } catch (error) {
    if (error instanceof HTTPErrors) {
      return res.status(error.code).json({ 'message': error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const getProjectTimeline = async (req, res) => {
  try {
    const projectTimeline = await projectService.getProjectTimeline(req.params.project_id);
    return res.status(200).json(projectTimeline);
  } catch (error) {

    if (error instanceof HTTPErrors) {
      return res.status(error.code).json({ 'message': error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const getProjectTimelineStoryPoints = async (req, res) => {
  try {
    const projectTimeline = await projectService.getProjectTimelineStoryPoints(req.params.project_id);
    return res.status(200).json(projectTimeline);
  } catch (error) {

    if (error instanceof HTTPErrors) {
      return res.status(error.code).json({ 'message': error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const getEffortDistribution = async (req, res) => {
  try {
    const effortDistribution = await projectService.getEffortDistribution(req.params.project_id);
    return res.status(200).json(effortDistribution);
  } catch (error) {

    if (error instanceof HTTPErrors) {
      return res.status(error.code).json({ 'message': error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const getTeamDistribution = async (req, res) => {
  try {
    const teamDistribution = await projectService.getTeamDistribution(req.params.project_id);
    res.status(200).json(teamDistribution);
  } catch (error) {

    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const getRollOffDate = async function (req, res) {
  const projectID = req.params.project_id;
  const username = req.params.username;
  try {
    const date = await projectService.getRollOffDate(projectID, username);
    res.status(200).json(date);
  }
  catch (error) {

    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }

};
const getUsersCountByUsername = async (req, res) => {
  try {
    const project = await projectService.getUsersByUsername();
    res.status(200).json(project);
  } catch (error) {
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const getProjectDetailsById = async (req, res) => {
  try {
    const project = await projectService.getProjectDetailsById(req.params.project_id);
    res.status(200).json(project);
  } catch (error) {
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const postChargeCodes = async (req, res) => {
  try {
    const chargeCodes = await projectService.postChargeCodes(req.params.projectID, Object.values(req.body));
    if (chargeCodes === 'project with given id not found.')
      res.status(400).json(chargeCodes);
    else
      res.status(200).json(chargeCodes);
  } catch (error) {
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const getChargeCodes = async (req, res) => {
  try {
    const chargeCodes = await projectService.getChargeCodes(req.params.projectID);
    if (chargeCodes === 'project with given id not found.')
      res.status(400).json(chargeCodes);
    else
      res.status(200).json(chargeCodes);
  } catch (error) {
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const updateChargeCodes = async (req, res) => {
  try {
    const chargeCodes = await projectService.updateChargeCodes(req.params.projectID, Object.values(req.body));
    if (chargeCodes === 'project with given id not found.')
      res.status(400).json(chargeCodes);
    else
      res.status(200).json(chargeCodes);
  } catch (error) {
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const getRepos = async (req, res) => {
  try {
    const repos = await projectService.getRepos(req.params.projectID);
    if (repos === 'project with given id not found.')
      res.status(400).json(repos);
    else
      res.status(200).json(repos);
  } catch (error) {
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

const editProject = async (req, res) => {
  try {
    const project=await projectService.editProject(req.params.projectID, req.body);
    res.status(200).json(project);
  } catch (error) {
    if (error instanceof HTTPErrors) {
      res.status(error.code).json({ 'message': error.message });
    }
    res.status(500).json({ message: error.message });
  }
};
const getStoryCountByUser = async (req, res) => {
  try {
    const storyCount = await projectService.getStoryCountByUser(req.params.username);
    return res.status(200).json(storyCount);
  } catch (error) {
    if (error instanceof HTTPErrors) {
      return res.status(error.code).json({ 'message': error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  getProjectTimelineStoryPoints,
  getEffortDistribution,
  getProjectTimeline,
  getTeamDistribution,
  getProjectsCountByUsername,
  getRollOffDate,
  getTeamVelocity,
  getDeveloperVelocity,
  getProjectsByUsername,
  getUsersCountByUsername,
  getProjectDetailsById,
  postChargeCodes,
  getChargeCodes,
  updateChargeCodes,
  getStoryCountByUser,
  getWorkloadBarometer,
  getRepos,
  editProject,
};
// services for project details
const db = require('../models');
const teamService = require('../services/teamServices');
const githubProjectUtil = require('../utils/githubUtils/getProjectData');
const { Op } = require('sequelize');
const {Sequelize} = require('sequelize');
// create a new project for project_details model

const createProject = async (project) => {  
  const start_date = new Date(project.start_date);
  const end_date = new Date(project.end_date);
  const start_date_only = new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate());
  const end_date_only = new Date(end_date.getFullYear(), end_date.getMonth(), end_date.getDate());
  const projectDetails = {
    project_name: project.project_name,
    description: project.project_description,
    start_date: start_date_only,
    end_date: end_date_only,
    charge_codes: (project.charge_codes.length===1 && project.charge_codes[0]==='') ? [] : project.charge_codes
  };
  const newProject = await db.project_details.create(projectDetails);
  await teamService.addMember(newProject.project_id, project.team_members);
  const costsArr = project.supplementary_costs;
  let supplementaryCosts = costsArr.map(cost => {
    cost.project_id = newProject.project_id;
    cost.cost_type = cost.type;
    return cost;
  });
  await db.cost.bulkCreate(supplementaryCosts);
  const repoArr = project.repositories;
  let repositories = repoArr.map(link => {
    link.project_id = newProject.project_id;
    link.url = link.link;
    link.base_url = link.baseUrl;
    link.sonar_project_key = link.projectKey;
    link.link_name = link.name;
    return link;
  });
  await db.links.bulkCreate(repositories);
  return newProject;
};

// get all projects for project_details model

// const getAllProjects = async (page, rowsPerPage, username) => {

//   const project_ids = await db.teams.findAll({ where: { username: username }, attributes: ['project_id'] });
//   // if project is not over, add a new field isActive, project_details.start_date, project_details.end_date

//   // if the user is not a member of the project, make isActive false, teams.username for every teams.project_id, check teams.start_data and teams.end_date
//   const project_ids_arr = project_ids.map(project => project.dataValues.project_id);
//   let pageInt = parseInt(page);
//   let rowsPerPageInt = parseInt(rowsPerPage, 10);
//   const limit = rowsPerPageInt ? +rowsPerPageInt : 3;
//   const offset = pageInt ? pageInt * limit : 0;
//   const users = await db.project_details.findAndCountAll({ where: { project_id: { [Op.in]: project_ids_arr } }, offset: offset, limit: limit });
//   return users; // return {users, isActive} instead
// };

const getAllProjects = async (page, rowsPerPage, username) => {

  const project_ids = await db.teams.findAll({ where: { username: username }, attributes: ['project_id'] });
  const project_ids_arr = project_ids.map(project => project.dataValues.project_id);
  let pageInt = parseInt(page);
  let rowsPerPageInt = parseInt(rowsPerPage, 10);
  const limit = rowsPerPageInt ? +rowsPerPageInt : 3;
  const offset = pageInt ? pageInt * limit : 0;
  
  const users = await db.project_details.findAndCountAll({ 
    where: { project_id: { [Op.in]: project_ids_arr } }, 
    offset: offset, 
    limit: limit,
    attributes: ['project_name', 'project_id', 'start_date', 'end_date', [Sequelize.literal('CASE WHEN end_date > NOW() THEN true ELSE false END'), 'isActive']]
  });
  
  return users; // return {users, isActive} instead
};


const getProjectsByUsername = async (user_id, page, size) => {
  page--;
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  const projectIds = [];
  const team = await db.teams.findAll({
    where: {
      username: user_id
    },
    attributes: ['project_id']
  });
  team.map(project => projectIds.push(project.project_id));

  const projects = await db.project_details.findAll({
    offset: offset,
    limit: limit,
    where: {
      project_id: { [Op.in]: projectIds }
    }
  });
  return projects;
};
// get a project by project_id for project_details model

const getProjectById = async (project_id) => {
  const project = await db.project_details.findAll({
    where: {
      project_id: project_id
    }
  });
  if (!project) {
    throw new Error('Project not found');
  }
  console.log(project);
  return project;
};

// get a project by username for project_details model
const getProjectsCountByUsername = async (username) => {
  const project = await db.teams.findAndCountAll({
    where: {
      username: username
    }
  });
  if (!project) {
    throw new Error('Project not found');
  }
  return project.count;
};

// update a project by project_id for project_details model

const updateProjectById = async (project_id, project) => {
  const updatedProject = await db.project_details.update(project, {
    where: {
      project_id: project_id
    }
  });
  if (!updatedProject) {
    throw new Error('Project not found');
  }
  return updatedProject;
};

// delete a project by project_id for project_details model

const deleteProjectById = async (project_id) => {
  const deletedProject = await db.project_details.destroy({
    where: {
      project_id: project_id
    }
  });
  if (!deletedProject) {
    throw new Error('Project not found');
  }
  return deletedProject;
};

// eslint-disable-next-line no-unused-vars
const getTeamVelocity = async (project_id) => {
  const projectLink = await db.links.findOne({
    where: { project_id: project_id, link_name: 'project' }
    , attributes: ['url']
  });
  const org=projectLink?.url.split('/')[4];
  const projectNumber=projectLink?.url.split('/')[6];
  return githubProjectUtil.getTeamVelocity(org,projectNumber);
};

const getStoryCountByUser = async (username) => {
  const projectsIds=await db.teams.findAll({
    where: { username: username }
    , attributes: ['project_id']
  });
  const projects=[...new Set(projectsIds.map(item=>item.project_id))];
  let storiesCompletedCount=0;
  let storiesAssignedCount=0;
  for(let i=0;i<projects.length;i++){
    const project_id=projects[i];
    const projectLink = await db.links.findOne({
      where: { project_id: project_id, link_name: 'project' }
      , attributes: ['url']
    });
    const org=projectLink.url.split('/')[4];
    const projectNumber=projectLink.url.split('/')[6];
    const user = await db.users.findOne({
      where: { username: username }
    });
    const storyCount=await githubProjectUtil.getStoryCountByUser(org,projectNumber, user.github);
    storiesCompletedCount+=storyCount.completed;
    storiesAssignedCount+=storyCount.total;
  }
  return {storiesCompletedCount,storiesAssignedCount};
  
};

const getWorkloadBarometer = async (username) => {
  const projectsIds=await db.teams.findAll({
    where: { username: username }
    , attributes: ['project_id']
  });
  const uniqueProjectIds=[...new Set(projectsIds.map(item=>item.project_id))];
  const activeProjects=await db.project_details.findAll({
    where: { project_id: { [Op.in]: uniqueProjectIds }, end_date: { [Op.gt]: new Date() } }
    , attributes: ['project_id']
  });
  let workloads=[];
  for(let i=0;i<activeProjects.length;i++){
    const project_id=activeProjects[i].project_id;
    const projectLink = await db.links.findOne({
      where: { project_id: project_id, link_name: 'project' }
      , attributes: ['url']
    });
    const org=projectLink.url.split('/')[4];
    const projectNumber=projectLink.url.split('/')[6];
    const user = await db.users.findOne({
      where: { username: username }
    });
    const storyPointsAssigned=await githubProjectUtil.getStoryPointsByUser(org,projectNumber, user.github);
    const noOfDaysLeft=await githubProjectUtil.getNoOfDaysLeftInCurrentSprint(org,projectNumber);
    const requiredVelocity=(Number(Number(storyPointsAssigned.total)/Number(noOfDaysLeft)));
    const developerVelocity=await githubProjectUtil.getDeveloperVelocity(org,projectNumber, user.github);
    const workload=Number(Number(developerVelocity)/Number(requiredVelocity));
    workloads.push(workload?workload:0);
  }
  // const currentSprint=await githubProjectUtil.getCurrentSprint(org,projectNumber);
  
  const averageWorkload=Number(Number(workloads.reduce((a, b) => a + b, 0)) / Number(workloads.length));
  return averageWorkload.toFixed(2)==='Infinity' || !averageWorkload?0:averageWorkload.toFixed(2);
};


const getDeveloperVelocity = async (project_id, username) => {
  const projectLink = await db.links.findOne({
    where: { project_id: project_id, link_name: 'project' }
    , attributes: ['url']
  });
  const org=projectLink.url.split('/')[4];
  const projectNumber=projectLink.url.split('/')[6];
  const user = await db.users.findOne({
    where: { username: username }
  });
  return githubProjectUtil.getDeveloperVelocity(org,projectNumber, user.github);
};

const getProjectTimeline = async (project_id) => {
  const projectLink = await db.links.findOne({
    where: { project_id: project_id, link_name: 'project' }
    , attributes: ['url']
  });
  const org=projectLink.url.split('/')[4];
  const projectNumber=projectLink.url.split('/')[6];
  const issues = await githubProjectUtil.getAllIssuesinCurrentSprint(org,projectNumber);
  const groupedIssues = await githubProjectUtil.groupIssuesByStatus(org,issues,projectNumber);
  return groupedIssues;
};


const getProjectTimelineStoryPoints = async (project_id) => {

  const projectLink = await db.links.findOne({
    where: { project_id: project_id, link_name: 'project' }
    , attributes: ['url']
  });
  const org=projectLink.url.split('/')[4];
  const projectNumber=projectLink.url.split('/')[6];
  const storyPoints = await githubProjectUtil.getStoryPointsBySprints(org,projectNumber);

  return storyPoints;
};

const getEffortDistribution = async (project_id) => {
  const projectLink = await db.links.findOne({
    where: { project_id: project_id, link_name: 'project' }
    , attributes: ['url']
  });
  const org=projectLink.url.split('/')[4];
  const projectNumber=projectLink.url.split('/')[6];
  const sprints = await githubProjectUtil.getAllSprints(org,projectNumber);
  const countOfIssuesInEpics = await githubProjectUtil.getIssuesByEpicsForSprints(org,projectNumber);
  return {
    sprints: sprints,
    countOfIssuesInEpics: countOfIssuesInEpics
  };
};

// eslint-disable-next-line no-unused-vars
const getTeamDistribution = async (project_id) => {
  const projectLink = await db.links.findOne({
    where: { project_id: project_id, link_name: 'project' }
    , attributes: ['url']
  });
  const org=projectLink.url.split('/')[4];
  const projectNumber=projectLink.url.split('/')[6];
  const teamDistribution = await githubProjectUtil.getTeamDistribution(org, projectNumber, project_id);
  return teamDistribution;
};
const getProjectByUsername = async (username) => {
  const projectIds = await db.teams.findAll({
    attributes: ['project_id'],
    where: {
      username: username
    },
    raw: true
  });

  const currentDateTime = new Date();

  const totalProjects = await db.project_details.findAll({
    where: {
      project_id: projectIds.map((project) => project.project_id),
    }
  });

  const ongoingProjects = await db.project_details.findAll({
    where: {
      project_id: projectIds.map((project) => project.project_id),
      start_date: { [Op.lte]: currentDateTime },
      end_date: { [Op.gte]: currentDateTime }
    }
  });

  return {
    totalProjects: totalProjects.length,
    ongoingProjects: ongoingProjects.length
  };
};


const getUsersByUsername = async () => {
  const totalUsers = await db.users.findAll();
  //currently working users are those who have end date greater than current date and the username must be unique
  const currentlyActiveUsers = await db.teams.findAll({ where: { end_date: { [Op.gt]: new Date() } }, attributes: ['username'], group: ['username'] });
  return {
    totalUsers: totalUsers.length,
    currentlyActiveUsers: currentlyActiveUsers.length
  };
};


const getRollOffDate = async (projectId, username)=>{
  const date = (await db.teams.findOne({
    where: {
      [Op.and]: [{ username: username }, { project_id: projectId }]
    }
  }));

  if (!date)
    return 'User not enrolled in given project.';

  return date.dataValues.end_date;
};

const getProjectDetailsById = async (project_id) => {
  const project = await db.project_details.findOne({
    where: {
      project_id: project_id
    }
  });
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
};

const postChargeCodes = async (projectID, chargeCodes) => {
  const project = await db.project_details.findOne( {where: {project_id: projectID}} );
  if(project===null)
    return 'project with given id not found.';
  
  await db.project_details.update( {charge_codes: chargeCodes},
    {
      where: {
        project_id: projectID
      }
    }
  );
  return chargeCodes;
};

const getChargeCodes = async (projectID) => {
  const projects = await db.project_details.findAll( {where: {project_id: projectID}, attributes: [ 'charge_codes' ]});
  if(projects === null)
    return 'project with given id not found.';
  return projects;
};

const updateChargeCodes = async (projectID, chargeCodes) => {
  const project = await db.project_details.findOne( {where: {project_id: projectID}} );
  if(project===null)
    return 'project with given id not found.';
  
  await db.project_details.update( {charge_codes: chargeCodes},
    {
      where: {
        project_id: projectID
      }
    }
  );
  return chargeCodes;
};

const getRepos = async (projectID) =>{
  const project = await db.project_details.findOne( {where: {project_id: projectID}} );
  if(project===null)
    return 'project with given id not found.';
  return await db.links.findAll( { where:{project_id: projectID} } );
};

const editProject = async (projectID, project) => {
  const _project = await db.project_details.findOne( {where: {project_id: projectID}} );
  if(_project===null)
    return 'project with given id not found.';
    
  const start_date = new Date(project.start_date);
  const end_date = new Date(project.end_date);
  const start_date_only = new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate());
  const end_date_only = new Date(end_date.getFullYear(), end_date.getMonth(), end_date.getDate());
  const projectDetails = {
    project_name: project.project_name,
    description: project.project_description,
    start_date: start_date_only,
    end_date: end_date_only,
    charge_codes: (project.charge_codes.length===1 && project.charge_codes[0]==='') ? [] : project.charge_codes
  };
  const updatedProject = await db.project_details.update(projectDetails, { where : {project_id: projectID}});
  await teamService.editMembers(projectID, project.team_members);
  
  const costsArr = project.supplementary_costs;
  let supplementaryCosts = costsArr.map(cost => {
    cost.project_id = projectID;
    cost.cost_type = cost.type;
    return cost;
  });
  
  await db.cost.destroy({where: {project_id: projectID}});
  await db.cost.bulkCreate(supplementaryCosts);
  
  const repoArr = project.repositories;
  console.log(repoArr);
  let repositories = repoArr.map(link => {
    link.project_id = projectID;
    link.url = link.link;
    link.base_url = link.baseUrl;
    link.sonar_project_key = link.projectKey;
    link.link_name = link.name;
    return link;
  });
  await db.links.destroy({where: {project_id: projectID}});
  await db.links.bulkCreate(repositories);

  return updatedProject;
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  getProjectTimeline,
  getProjectTimelineStoryPoints,
  getEffortDistribution,
  getTeamDistribution,
  getRollOffDate,
  getProjectsCountByUsername,
  getTeamVelocity,
  getDeveloperVelocity,
  getProjectsByUsername,
  getProjectByUsername,
  getUsersByUsername,
  getProjectDetailsById,
  postChargeCodes,
  getChargeCodes,
  updateChargeCodes,
  getStoryCountByUser,
  getWorkloadBarometer,
  getRepos,
  editProject
};

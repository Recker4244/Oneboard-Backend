/* eslint-disable no-unused-vars */
const {authenticate} = require('./githubAuth');
const db=require('../../models/index');
const {Op}=require('sequelize');

// eslint-disable-next-line no-unused-vars
const getProjectData = async (org, projectNumber) => {

  const octokit = await authenticate([org]);
  let fields=await octokit[org].graphql(`
  query getFields($login: String!, $number: Int!){
    organization(login:$login) {
      projectV2(number: $number){
            fields(first:100)
          {
          nodes{
            ... on ProjectV2FieldCommon{
              name
            }
          }
          }
          }
        }
  }`,
  {
    login: org,
    number: Number(projectNumber)
  }
  );
  let customFields=fields.organization.projectV2.fields.nodes;
  if(customFields.filter(field=>field.name==='Sprint').length===0){
    const octokit = await authenticate([org]);
    const sprints=['Sprint 1','Sprint 2','Sprint 3','Sprint 4'];
    let projectData;
    projectData= await octokit[org].graphql(`
    query getProjectData($login: String!, $number: Int!){
      organization(login:$login) {
        projectV2(number: $number) {
          title
          status: field(name: "Status") {
            ... on ProjectV2SingleSelectField {
              options {
                name
              }
            }
          }
          epic: field(name: "Epic") {
            ... on ProjectV2SingleSelectField {
              options {
                name
              }
            }
          }
          items(first: 100) {
            nodes {
              content {
                ... on Issue {
                  title
                  url
                  state
                  assignees(first: 10) {
                    nodes {
                      login
                    }
                  }
                }
              }
              status: fieldValueByName(name: "Status") {
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                }
              }
              epic: fieldValueByName(name: "Epic") {
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                }
              }
            }
          }
        }
      }
    }`,
    {
      login: org,
      number: Number(projectNumber)
    }
    );
  
    projectData.organization.projectV2.sprint={
      'configuration': {
        'duration': 14,
        'startDay': 5,
        'iterations': [
          {
            'duration': 14,
            'startDate': '2023-03-24',
            'title': 'Sprint 1'
          },
          {
            'duration': 14,
            'startDate': '2023-04-07',
            'title': 'Sprint 2'
          },
          {
            'duration': 14,
            'startDate': '2023-04-21',
            'title': 'Sprint 3'
          },
          {
            'duration': 14,
            'startDate': '2023-05-05',
            'title': 'Sprint 4'
          }
        ]
      }
    };
    let issues=projectData.organization.projectV2.items.nodes;
    for(let i=0;i<issues.length;i++)
    {
      let issue=issues[i];
      if(!issue.sprint)
      {
        issue.sprint={
          'duration': 14,
          'title': sprints[Math.floor(Math.random() * sprints.length)]
        };
      }
      if(!issue.storyPoints)
      {
        issue.storyPoints={
          'number': Math.floor(Math.random() * 1) + 1
        };
      }
    }
    projectData.organization.projectV2.items.nodes=issues;
    return projectData;
  }
  else
  {
    const octokit = await authenticate([org]);
    const sprints=['Sprint 1','Sprint 2','Sprint 3'];
    let projectData;
    projectData= await octokit[org].graphql(`
    query getProjectData($login: String!, $number: Int!){
      organization(login:$login) {
        projectV2(number: $number) {
          title
          sprint: field(name: "Sprint") {
            ... on ProjectV2IterationField {
              configuration {
                duration
                startDay
                iterations {
                  duration
                  startDate
                  title
                }
              }
            }
          }
          status: field(name: "Status") {
            ... on ProjectV2SingleSelectField {
              options {
                name
              }
            }
          }
          epic: field(name: "Epic") {
            ... on ProjectV2SingleSelectField {
              options {
                name
              }
            }
          }
          items(first: 100) {
            nodes {
              content {
                ... on Issue {
                  title
                  url
                  state
                  assignees(first: 10) {
                    nodes {
                      login
                    }
                  }
                }
              }
              status: fieldValueByName(name: "Status") {
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                }
              }
              epic: fieldValueByName(name: "Epic") {
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                }
              }
              sprint: fieldValueByName(name: "Sprint") {
                ... on ProjectV2ItemFieldIterationValue {
                  duration
                  title
                }
              }
    
              storyPoints:fieldValueByName(name: "Story Points"){
                  ... on ProjectV2ItemFieldNumberValue {
                  number 
                }
              }
            }
          }
        }
      }
    }`,
    {
      login: org,
      number: Number(projectNumber)
    }
    );
    return projectData;
  }
  
};

const getTeamVelocity = async (org,projectNumber) => {
  const projectData = await getProjectData(org, projectNumber);
  let storyPoints=0;
  const numberOfSprints = projectData.organization.projectV2.sprint?.configuration.iterations.length ?? 0;
  const projectIssues = projectData.organization.projectV2.items.nodes;
  projectIssues.forEach((issue) => {
    if (issue.storyPoints) {
      storyPoints+=issue.storyPoints.number;
    }
  });
  const teamVelocity = Number(Number(storyPoints) / Number(numberOfSprints));
  return teamVelocity.toFixed(2);
};

const getDeveloperVelocity=async (org,projectNumber,username)=>{
  const projectData = await getProjectData(org, projectNumber);
  const projectIssues = projectData.organization.projectV2.items.nodes;
  const issuesByDeveloper=projectIssues.filter((issue)=>issue.content.assignees?.nodes?.map((assignee)=>assignee.login).includes(username));
  const numberOfSprints = projectData.organization.projectV2.sprint.configuration.iterations.length;
  let storyPoints=0;
  issuesByDeveloper.forEach((issue) => {
    if (issue.storyPoints) {
      storyPoints+=issue.storyPoints.number;
    }
  });
  const developerVelocity = (Number(storyPoints)/Number(numberOfSprints));
  return developerVelocity.toFixed(2);
};


const getCurrentSprint = async (org,projectNumber) => {
  const projectData = await getProjectData(org, projectNumber);
  const sprints = projectData.organization.projectV2.sprint.configuration.iterations;
  let currentSprint;
  sprints.forEach((sprint) => {
    const startDate = new Date(sprint.startDate);
    if (startDate <= new Date() && new Date() <= new Date(startDate.setDate(startDate.getDate() + sprint.duration))) {
      currentSprint = sprint.title;
    }
  });
  return currentSprint;
};

const getNoOfDaysLeftInCurrentSprint = async (org,projectNumber) => {
  const projectData = await getProjectData(org, projectNumber);
  const sprints = projectData.organization.projectV2.sprint.configuration.iterations;
  let daysLeft;
  sprints.forEach((sprint) => {
    const startDate = new Date(sprint.startDate);
    if (startDate <= new Date() && new Date() <= new Date(startDate.setDate(startDate.getDate() + sprint.duration))) {
      daysLeft = sprint.duration - (new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24);
    }
  });
  return daysLeft;
};


const groupIssuesForTime=async (issuesByStatus,status)=>{
  const groupedIssues = [];
  for(let i=0;i<issuesByStatus.length;i++){
    const issue=issuesByStatus[i];
    const issueObject = {};
    issueObject.title = issue.content.title;
    issueObject.url = issue.content.url;
    issueObject.epic=issue.epic?.name;
    const assignees = issue.content.assignees?.nodes.map((assignee) => assignee.login);
    const user=await db.users.findOne({where:{github:assignees&&assignees.length!==0?assignees[0]:'unassigned'}});
    issueObject.assignee = user?.name;
    groupedIssues.push(issueObject);
  }
  return groupedIssues;
};

const groupIssuesByStatus = async (org,issuesInCurrentSprint,projectNumber) => {
  const projectData = await getProjectData(org, projectNumber);
  const statuses = projectData.organization.projectV2.status.options.map((status) => status.name);
  let groupedIssues={};
  for(let i=0;i<statuses.length;i++){
    const status=statuses[i];
    const issuesByStatus = issuesInCurrentSprint.filter((issue) => issue.status?.name === status);
    groupedIssues[status]=await groupIssuesForTime(issuesByStatus,status);
  } 
  const sprints = projectData.organization.projectV2.sprint.configuration.iterations;
  let currentSprint=sprints.filter((sprint) => (new Date(sprint.startDate) <= new Date() && new Date() <= new Date((new Date(sprint.startDate)).setDate(new Date(sprint.startDate).getDate() + sprint.duration))));
  const projectTimeLine={issues:groupedIssues,currentSprint:currentSprint[0].title,startDate:currentSprint[0].startDate,duration:currentSprint[0].duration};
  return projectTimeLine;
};



const getAllIssuesinCurrentSprint = async (org,projectNumber) => {
  const projectData = await getProjectData(org, projectNumber);
  const currentSprint = await getCurrentSprint(org,projectNumber);
  const projectIssues = projectData.organization.projectV2.items.nodes;
  const issuesInCurrentSprint = [];
  projectIssues.forEach((issue) => {
    if (issue.sprint && issue.sprint.title === currentSprint) {
      issuesInCurrentSprint.push(issue);
    }
  });
  return issuesInCurrentSprint;
};

const getStoryPointsBySprints = async (org,projectNumber) => {
  const projectData = await getProjectData(org, projectNumber);
  const sprints = projectData.organization.projectV2.sprint.configuration.iterations;
  const projectIssues = projectData.organization.projectV2.items.nodes;
  const storyPointsBySprints = [];
  sprints.forEach((sprint,index) => {
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(startDate.setDate(startDate.getDate() + sprint.duration));
    const issues=projectIssues.filter((issue)=>issue.sprint && issue.sprint.title===sprint.title);
    let storyPoints=0;
    issues.forEach((issue) => {
      if (issue.storyPoints) {
        storyPoints+=Number(issue.storyPoints.number)??0;
      }
    });
    storyPointsBySprints.push({name:sprint.title, startDate:startDate, endDate:endDate, storyPoints:storyPoints});
  }
  );
  return storyPointsBySprints;
};

const getIssuesByEpicsForSprints = async (org,projectNumber) => {
  const projectData = await getProjectData(org, projectNumber);
  const sprints = projectData.organization.projectV2.sprint.configuration.iterations;
  const projectIssues = projectData.organization.projectV2.items.nodes;
  const epics = projectData.organization.projectV2.epic.options.map((epic) => epic?.name);
  const issuesByEpicsForSprints = [];
  for(let i=0;i<epics.length;i++){
    issuesByEpicsForSprints[i]={name:epics[i],data:[]};
    sprints.forEach((sprint) => {
      const issuesInSprint=projectIssues.filter((issue) => issue.sprint && issue.sprint.title === sprint.title);
      let totalStoryPoint=0;
      for(let j=0;j<issuesInSprint.length;j++)
      {
        if(issuesInSprint[j].epic?.name===epics[i])
        {
          totalStoryPoint+=Number(issuesInSprint[j].storyPoints?.number??0);
        }
      }
      issuesByEpicsForSprints[i].data.push(totalStoryPoint);
    });
  }
  return issuesByEpicsForSprints;
};

const getTeamDistribution = async (org,projectNumber,projectId) => {
  const projectData = await getProjectData(org, projectNumber);
  const sprints = projectData.organization.projectV2.sprint.configuration.iterations;
  const teamDistribution = {};
  for(let i=0;i<sprints.length;i++)
  {
    const sprint=sprints[i];
    const start_date=new Date(sprint.startDate);
    const end_date=new Date((new Date(sprint.startDate)).setDate(new Date(sprint.startDate).getDate() + sprint.duration));
    const teamCount=await db.teams.findAll({where:{start_date:{[Op.gte]:start_date},project_id:projectId}});
    teamDistribution[sprint.title]=teamCount.length ?? 0;
  }
  return teamDistribution;
};

const getAllSprints = async (org,projectNumber) => {
  const projectData = await getProjectData(org, projectNumber);
  const sprints = projectData.organization.projectV2.sprint.configuration.iterations;
  return sprints.map((sprint) => sprint.title);
};

const getStoryCountByUser = async (org,projectNumber,username) => {
  const issues=await getAllIssuesinCurrentSprint(org,projectNumber);
  const totalIssues=issues.filter((issue)=>issue.content.assignees.nodes.filter((assignee)=>assignee.login===username).length!==0);
  const projectData = await getProjectData(org, projectNumber);
  const statuses = projectData.organization.projectV2.status.options.map((status) => status.name);
  const completedIssues=totalIssues.filter((issue)=>issue.status.name===statuses[statuses.length-1]);
  return {total:totalIssues.length,completed:completedIssues.length};
};

const getStoryPointsByUser = async (org,projectNumber,username) => {
  const issues=await getAllIssuesinCurrentSprint(org,projectNumber);
  const totalIssues=issues.filter((issue)=>issue.content.assignees.nodes.filter((assignee)=>assignee.login===username).length!==0);
  const projectData = await getProjectData(org, projectNumber);
  const statuses = projectData.organization.projectV2.status.options.map((status) => status.name);
  const completedIssues=totalIssues.filter((issue)=>issue.status.name===statuses[statuses.length-1]);
  let totalStoryPoints=0;
  let completedStoryPoints=0;
  totalIssues.forEach((issue)=>{totalStoryPoints+=Number(issue.storyPoints?.number??0);});
  completedIssues.forEach((issue)=>{completedStoryPoints+=Number(issue.storyPoints?.number??0);});
  return {total:totalStoryPoints,completed:completedStoryPoints};
};

module.exports = { 
  getTeamVelocity,
  getCurrentSprint,
  getAllIssuesinCurrentSprint,
  getIssuesByEpicsForSprints,
  getStoryPointsBySprints,groupIssuesByStatus,
  getAllSprints,
  getTeamDistribution,
  getDeveloperVelocity,
  getStoryCountByUser,
  getStoryPointsByUser,
  getNoOfDaysLeftInCurrentSprint
};
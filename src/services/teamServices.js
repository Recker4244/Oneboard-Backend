const db = require('../models/index');
const { Op } = require('sequelize');
// require('promise');

const addMember = async (project_id, members) => {
  let team_members = members.map(member => {
    console.log(member.key_status);
    member.project_id = project_id;
    member.start_date = new Date(member.startDate);
    member.end_date = new Date(member.endDate);
    member.key_status = member.keyStatus;
    member.cost = ( isNaN(Number(member.cost)) ) ? 0 : Number(member.cost);
    member.key_status = (member.key_status===undefined) ? false: member.key_status;
    return member;
  });
  // console.log(team_members);
  const storedMembers = await db.teams.bulkCreate(team_members);
  return storedMembers;
};

const mapTeamMember = (username, role, key_status, start_date, end_date, cost, project_id)=>{ 
  return {
    username, role, key_status, start_date, end_date, cost, project_id
  };
};

const editMembers = async (projectID, teamMembers)=>{
  // To delete removed team members
  // const oldTeamMembers = await db.teams.findAll({where: {project_id: projectID}});
  // const removedTeamMembers = oldTeamMembers.filter( oldTeamMember => !teamMembers.includes(teamMember => teamMember.username===oldTeamMember.username ) );
  // removedTeamMembers.forEach( async (teamMember) =>  await db.teams.destroy({where: {[Op.and]: [{project_id: projectID}, {username: teamMember.username}]}}));

  teamMembers.forEach( async (teamMember) => {
    const { username, role, keyMember, startDate, endDate, cost } = teamMember;
    const result = await db.teams.update(mapTeamMember(username, role, keyMember, startDate, endDate, cost, projectID), {where: {[Op.and]: [{project_id: projectID}, {username: teamMember.username}]}});
    if(result[0]===0)
      await db.teams.create((mapTeamMember(username, role, keyMember, startDate, endDate, cost, projectID)));
  });
};

const getTeam = async (project_id) => {
  const teams = await db.teams.findAll({
    where: { project_id: project_id },
    include: [{ model: db.users, attributes: ['name', 'email', 'phoneno', 'role', 'github', 'flag'] }]
  });
  return teams;
};

const updateMember = async (project_id, team_members) => {
  // console.log(team_members);
  team_members.map((member) => {
    db.teams.update(member, { where: { project_id: project_id, username: member.username } });
  });
  const updatedMembers = await db.teams.findAll({ where: { project_id: project_id } });
  return updatedMembers;
};

module.exports = { addMember, getTeam, updateMember, editMembers };
/* eslint-disable no-unused-vars */
const projectService = require('../../src/services/projectService');
const projectController = require('../../src/controllers/projectController');

describe('projectController', () => {

  // describe('getAllProjects', () => {

  //   it('should return 200 and all projects if the projects are found', async () => {
  //     jest.spyOn(projectService, 'getAllProjects').mockResolvedValue([{ project_id: 'project_id', project_name: 'project_name' }]);
  //     const req = { query: { page: 1, rowsPerPage: 10, username: 'username' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getAllProjects(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith([{ project_id: 'project_id', project_name: 'project_name' }]);
  //   });

  //   it('should return 500 and error message if the projects are not found', async () => {
  //     jest.spyOn(projectService, 'getAllProjects').mockRejectedValue(new Error('error'));
  //     const req = { query: { page: 1, rowsPerPage: 10, username: 'username' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getAllProjects(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('createProject', () => {

  //   it('should return 201 and created project if the project is created', async () => {
  //     jest.spyOn(projectService, 'createProject').mockResolvedValue({ project_id: 'project_id', project_name: 'project_name' });
  //     const req = { body: { project_id: 'project_id', project_name: 'project_name' } };

  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.createProject(req, res);
  //     expect(res.status).toBeCalledWith(201);
  //     expect(res.json).toBeCalledWith({ project_id: 'project_id', project_name: 'project_name' });
  //   });

  //   it('should return 500 and error message if the project is not created', async () => {
  //     jest.spyOn(projectService, 'createProject').mockRejectedValue(new Error('error'));
  //     const req = { body: { project_id: 'project_id', project_name: 'project_name' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.createProject(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });

  // });

  // describe('getProjectsByUsername', () => {
  //   it('should return 200 and all projects if the projects are found', async () => {
  //     jest.spyOn(projectService, 'getProjectsByUsername').mockResolvedValue([{ project_id: 'project_id', username: 'project_name' }]);
  //     const req = { query: { page: 1, rowsPerPage: 10, }, params: { username: 'username' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getProjectsByUsername(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith([{ project_id: 'project_id', username: 'project_name' }]);
  //   });

  //   it('should return 500 and error message if the projects are not found', async () => {
  //     jest.spyOn(projectService, 'getProjectsByUsername').mockRejectedValue(new Error('error'));
  //     const req = { query: { page: 1, rowsPerPage: 10, }, params: { username: 'username' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getProjectsByUsername(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('getProjectById', () => {
  //   it('should return 200 and project if the project is found', async () => {
  //     jest.spyOn(projectService, 'getProjectById').mockResolvedValue({ project_id: 'project_id', username: 'project_name' });
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getProjectById(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ project_id: 'project_id', username: 'project_name' });
  //   });

  //   it('should return 500 and error message if the project is not found', async () => {
  //     jest.spyOn(projectService, 'getProjectById').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getProjectById(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // // describe('getProjectsCountByUsername', () => {
  // //   it('should return 200 and count if the count is found', async () => {
  // //     jest.spyOn(projectService, 'getProjectsCountByUsername').mockResolvedValue({ count: 1 });
  // //     const req = { params: { username: 'username' } };
  // //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  // //     await projectController.getProjectsCountByUsername(req, res);
  // //     expect(res.status).toBeCalledWith(200);
  // //     expect(res.json).toBeCalledWith({ count: 1 });
  // //   });

  // //   it('should return 500 and error message if the count is not found', async () => {
  // //     jest.spyOn(projectService, 'getProjectsCountByUsername').mockRejectedValue(new Error('error'));
  // //     const req = { params: { username: 'username' } };
  // //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  // //     await projectController.getProjectsCountByUsername(req, res);
  // //     expect(res.status).toBeCalledWith(500);
  // //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  // //   });
  // // });

  // describe('updateProjectById', () => {
  //   it('should return 200 and updated project if the project is updated', async () => {
  //     jest.spyOn(projectService, 'updateProjectById').mockResolvedValue({ project_id: 'project_id', project_name: 'project_name' });
  //     const req = { params: { project_id: 'project_id' }, body: { project_name: 'project_name' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.updateProjectById(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ project_id: 'project_id', project_name: 'project_name' });
  //   });

  //   it('should return 500 and error message if the project is not updated', async () => {
  //     jest.spyOn(projectService, 'updateProjectById').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' }, body: { project_name: 'project_name' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.updateProjectById(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('deleteProjectById', () => {
  //   it('should return 200 and deleted project if the project is deleted', async () => {
  //     jest.spyOn(projectService, 'deleteProjectById').mockResolvedValue({ project_id: 'project_id', project_name: 'project_name' });
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.deleteProjectById(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ project_id: 'project_id', project_name: 'project_name' });
  //   });

  //   it('should return 500 and error message if the project is not deleted', async () => {
  //     jest.spyOn(projectService, 'deleteProjectById').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.deleteProjectById(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('getTeamVelocity', () => {
  //   it('should return 200 and team velocity if the team velocity is found', async () => {
  //     jest.spyOn(projectService, 'getTeamVelocity').mockResolvedValue({ team_velocity: 1 });
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getTeamVelocity(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ team_velocity: 1 });
  //   });

  //   it('should return 500 and error message if the team velocity is not found', async () => {
  //     jest.spyOn(projectService, 'getTeamVelocity').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getTeamVelocity(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('getDeveloperVelocity', () => {
  //   it('should return 200 and developer velocity if the developer velocity is found', async () => {
  //     jest.spyOn(projectService, 'getDeveloperVelocity').mockResolvedValue({ developer_velocity: 1 });
  //     const req = { params: { project_id: 'project_id' }, query: { username: 'username' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getDeveloperVelocity(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ developer_velocity: 1 });
  //   });

  //   it('should return 500 and error message if the developer velocity is not found', async () => {
  //     jest.spyOn(projectService, 'getDeveloperVelocity').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' }, query: { username: 'username' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getDeveloperVelocity(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('getWorkloadBarometer', () => {
  //   it('should return 200 and workload barometer if the workload barometer is found', async () => {
  //     jest.spyOn(projectService, 'getWorkloadBarometer').mockResolvedValue({ workload_barometer: 1 });
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getWorkloadBarometer(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ workload_barometer: 1 });
  //   });

  //   it('should return 500 and error message if the workload barometer is not found', async () => {
  //     jest.spyOn(projectService, 'getWorkloadBarometer').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getWorkloadBarometer(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('getProjectTimeline', () => {
  //   it('should return 200 and project timeline if the project timeline is found', async () => {
  //     jest.spyOn(projectService, 'getProjectTimeline').mockResolvedValue({ project_timeline: 1 });
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getProjectTimeline(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ project_timeline: 1 });
  //   });

  //   it('should return 500 and error message if the project timeline is not found', async () => {
  //     jest.spyOn(projectService, 'getProjectTimeline').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getProjectTimeline(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('getProjectTimelineStoryPoints', () => {
  //   it('should return 200 and project timeline story points if the project timeline story points are found', async () => {
  //     jest.spyOn(projectService, 'getProjectTimelineStoryPoints').mockResolvedValue({ project_timeline_story_points: 1 });
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getProjectTimelineStoryPoints(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ project_timeline_story_points: 1 });
  //   });

  //   it('should return 500 and error message if the project timeline story points are not found', async () => {
  //     jest.spyOn(projectService, 'getProjectTimelineStoryPoints').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getProjectTimelineStoryPoints(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('getEffortDistribution', () => {
  //   it('should return 200 and effort distribution if the effort distribution is found', async () => {
  //     jest.spyOn(projectService, 'getEffortDistribution').mockResolvedValue({ effort_distribution: 1 });
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getEffortDistribution(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ effort_distribution: 1 });
  //   });

  //   it('should return 500 and error message if the effort distribution is not found', async () => {
  //     jest.spyOn(projectService, 'getEffortDistribution').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getEffortDistribution(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('getTeamDistribution', () => {
  //   it('should return 200 and team distribution if the team distribution is found', async () => {
  //     jest.spyOn(projectService, 'getTeamDistribution').mockResolvedValue({ team_distribution: 1 });
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getTeamDistribution(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ team_distribution: 1 });
  //   });

  //   it('should return 500 and error message if the team distribution is not found', async () => {
  //     jest.spyOn(projectService, 'getTeamDistribution').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getTeamDistribution(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('getRollOffDates', () => {
  //   it('should return 200 and roll off dates if the roll off dates are found', async () => {
  //     jest.spyOn(projectService, 'getRollOffDate').mockResolvedValue({ roll_off_dates: 1 });
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getRollOffDate(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ roll_off_dates: 1 });
  //   });

  //   it('should return 500 and error message if the roll off dates are not found', async () => {
  //     jest.spyOn(projectService, 'getRollOffDate').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getRollOffDate(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('getUsersCountByUsername', () => {
  //   it('should return 200 and users count if the users count is found', async () => {
  //     jest.spyOn(projectService, 'getUsersByUsername').mockResolvedValue({ users_count: 1 });
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getUsersCountByUsername(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ users_count: 1 });
  //   });

  //   it('should return 500 and error message if the users count is not found', async () => {
  //     jest.spyOn(projectService, 'getUsersByUsername').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getUsersCountByUsername(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });

  // });

  // describe('getProjectDetailsById', () => {
  //   it('should return 200 and project details if the project details are found', async () => {
  //     jest.spyOn(projectService, 'getProjectDetailsById').mockResolvedValue({ project_details: 1 });
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getProjectDetailsById(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ project_details: 1 });
  //   });

  //   it('should return 500 and error message if the project details are not found', async () => {
  //     jest.spyOn(projectService, 'getProjectDetailsById').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getProjectDetailsById(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('postChargeCodes', () => {
  //   it('should return 200 and charge codes if the charge codes are successfully added', async () => {
  //     jest.spyOn(projectService, 'postChargeCodes').mockResolvedValue({ charge_codes: 1 });
  //     const req = { params: { project_id: 'project_id' }, body: { charge_codes: 1 } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.postChargeCodes(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ charge_codes: 1 });
  //   });

  //   it('should return 500 and error message if the charge codes are not successfully added', async () => {
  //     jest.spyOn(projectService, 'postChargeCodes').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' }, body: { charge_codes: 1 } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.postChargeCodes(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('getChargeCodes', () => {
  //   it('should return 200 and charge codes if the charge codes are found', async () => {
  //     jest.spyOn(projectService, 'getChargeCodes').mockResolvedValue({ charge_codes: 1 });
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getChargeCodes(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ charge_codes: 1 });
  //   });

  //   it('should return 500 and error message if the charge codes are not found', async () => {
  //     jest.spyOn(projectService, 'getChargeCodes').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getChargeCodes(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('updateChargeCodes', () => {
  //   it('should return 200 and charge codes if the charge codes are successfully updated', async () => {
  //     jest.spyOn(projectService, 'updateChargeCodes').mockResolvedValue({ charge_codes: 1 });
  //     const req = { params: { project_id: 'project_id' }, body: { charge_codes: 1 } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.updateChargeCodes(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ charge_codes: 1 });
  //   });

  //   it('should return 500 and error message if the charge codes are not successfully updated', async () => {
  //     jest.spyOn(projectService, 'updateChargeCodes').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' }, body: { charge_codes: 1 } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.updateChargeCodes(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('getRepos', () => {
  //   it('should return 200 and repos if the repos are found', async () => {
  //     jest.spyOn(projectService, 'getRepos').mockResolvedValue({ repos: 1 });
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getRepos(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ repos: 1 });
  //   });

  //   it('should return 500 and error message if the repos are not found', async () => {
  //     jest.spyOn(projectService, 'getRepos').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getRepos(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('editProject', () => {
  //   it('should return 200 and project details if the project details are successfully updated', async () => {
  //     jest.spyOn(projectService, 'editProject').mockResolvedValue({ project_details: 1 });
  //     const req = { params: { project_id: 'project_id' }, body: { project_details: 1 } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.editProject(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ project_details: 1 });
  //   });

  //   it('should return 500 and error message if the project details are not successfully updated', async () => {
  //     jest.spyOn(projectService, 'editProject').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' }, body: { project_details: 1 } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.editProject(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });
  // });

  // describe('getStoryCountByUser', () => {
  //   it('should return 200 and story count if the story count is found', async () => {
  //     jest.spyOn(projectService, 'getStoryCountByUser').mockResolvedValue({ story_count: 1 });
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getStoryCountByUser(req, res);
  //     expect(res.status).toBeCalledWith(200);
  //     expect(res.json).toBeCalledWith({ story_count: 1 });
  //   });
    
  //   it('should return 500 and error message if the project is not found', async () => {
  //     jest.spyOn(projectService, 'getStoryCountByUser').mockRejectedValue(new Error('error'));
  //     const req = { params: { project_id: 'project_id' } };
  //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  //     await projectController.getStoryCountByUser(req, res);
  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.status().json).toBeCalledWith({ message: 'error' });
  //   });

  // });

});
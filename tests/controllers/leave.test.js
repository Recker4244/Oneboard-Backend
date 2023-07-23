const leaveController = require('../../src/controllers/leaveController');
const leaveServices = require('../../src/services/leave');

describe('Leave Controller', () => {

  describe('createLeave', () => {
    it('should return 201 status code when leave is created', async () => {
      jest.spyOn(leaveServices, 'createLeave').mockResolvedValue({
        username: 'test user',
        start_date: '2021-01-01',
        end_date: '2021-01-01'
      });

      const mockReq = {
        body: {
          username: 'test user',
          start_date: '2021-01-01',
          end_date: '2021-01-01'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.createLeave(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith({
        status: 201,
        data: {
          username: 'test user',
          start_date: '2021-01-01',
          end_date: '2021-01-01'
        },
        message: 'Succesfully Created Leave'
      });
    });

    it('should return 500 status code when leave is not created', async () => {
      jest.spyOn(leaveServices, 'createLeave').mockRejectedValue(new Error('Error'));

      const mockReq = {
        body: {
          username: 'test user',
          start_date: '2021-01-01',
          end_date: '2021-01-01'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.createLeave(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        status: 500,
        message: 'Error'
      });
    });
  });

  describe('deleteLeave', () => {
    it('should return 200 status code when leave is deleted', async () => {
      jest.spyOn(leaveServices, 'deleteLeave').mockResolvedValue([1]);

      const mockReq = {
        params: {
          id: 1
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.deleteLeave(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        status: 200,
        data: [1],
        message: 'Succesfully Deleted Leave'
      });
    });

    it('should return 500 status code when leave is not deleted', async () => {
      jest.spyOn(leaveServices, 'deleteLeave').mockRejectedValue(new Error('Error'));

      const mockReq = {
        params: {
          id: 1
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.deleteLeave(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        status: 500,
        message: 'Error'
      });
    });

    it('should return 404 status code when leave is not found', async () => {
      jest.spyOn(leaveServices, 'deleteLeave').mockResolvedValue([0]);

      const mockReq = {
        params: {
          id: 1
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.deleteLeave(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({
        status: 404,
        message: 'Leave Not Found'
      });
    });
  });

  describe('getLeavesByProjectId', () => {
    it('should return 200 status code when leave is found', async () => {
      jest.spyOn(leaveServices, 'getLeavesByProjectId').mockResolvedValue([{
        username: 'test user',
        start_date: '2021-01-01',
        end_date: '2021-01-01'
      }]);
      const mockReq = {
        params: {
          projectId: 1
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.getLeavesByProjectId(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        status: 200,
        data: [{
          username: 'test user',
          start_date: '2021-01-01',
          end_date: '2021-01-01'
        }],
        message: 'Succesfully Retrieved Leaves'
      });
    });

    it('should return 500 status code when leave is not found', async () => {
      jest.spyOn(leaveServices, 'getLeavesByProjectId').mockRejectedValue(new Error('Error'));

      const mockReq = {
        params: {
          projectId: 1
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.getLeavesByProjectId(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        status: 500,
        message: 'Error'
      });
    });

    it('should return 404 status code when leave is not found', async () => {
      jest.spyOn(leaveServices, 'getLeavesByProjectId').mockResolvedValue([]);

      const mockReq = {
        params: {
          projectId: 1
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.getLeavesByProjectId(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({
        status: 404,
        message: 'Leaves Not Found'
      });
    });

  });

  describe('getLeavesByUser', () => {
    it('should return 200 status code when leave is found', async () => {
      jest.spyOn(leaveServices, 'getLeavesByUser').mockResolvedValue([{
        username: 'test',
        start_date: '2021-01-01',
        end_date: '2021-01-01'
      }]);
      const mockReq = {
        params: {
          username: 'test'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.getLeavesByUser(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        status: 200,
        data: [{
          username: 'test',
          start_date: '2021-01-01',
          end_date: '2021-01-01'
        }],
        message: 'Succesfully Retrieved Leaves'
      });
    });

    it('should return 500 status code when leave is not found', async () => {
      jest.spyOn(leaveServices, 'getLeavesByUser').mockRejectedValue(new Error('Error'));

      const mockReq = {
        params: {
          username: 'test'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.getLeavesByUser(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        status: 500,
        message: 'Error'
      });
    });

    it('should return 404 status code when leave is not found', async () => {
      jest.spyOn(leaveServices, 'getLeavesByUser').mockResolvedValue([]);

      const mockReq = {
        params: {
          username: 'test'
        }
      };

      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.getLeavesByUser(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({
        status: 404,
        message: 'Leaves Not Found'
      });
    });
  });

  describe('updateLeave', () => {
    it('should return 200 status code when leave is updated', async () => {
      jest.spyOn(leaveServices, 'updateLeave').mockResolvedValue([1, [{
        username: 'test user',
        start_date: '2021-01-01',
        end_date: '2021-01-01'
      }]]);

      const mockReq = {
        params: {
          id: 1
        },
        body: {
          start_date: '2021-01-01',
          end_date: '2021-01-01'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.updateLeave(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        status: 200,
        data: [{
          username: 'test user',
          start_date: '2021-01-01', 
          end_date: '2021-01-01'
        }],
        message: 'Succesfully Updated Leave'
      });
    });

    it('should return 500 status code when leave is not updated', async () => {
      jest.spyOn(leaveServices, 'updateLeave').mockRejectedValue(new Error('Error'));

      const mockReq = {
        params: {
          id: 1
        },
        body: {
          start_date: '2021-01-01',
          end_date: '2021-01-01'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.updateLeave(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        status: 500,
        message: 'Error'
      });
    });

    it('should return 404 status code when leave is not found', async () => {
      jest.spyOn(leaveServices, 'updateLeave').mockResolvedValue([0]);

      const mockReq = {
        params: {
          id: 1
        },
        body: {
          start_date: '2021-01-01',
          end_date: '2021-01-01'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      await leaveController.updateLeave(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({
        status: 404,
        message: 'Leave Not Found'
      });
    });
  });
  
});
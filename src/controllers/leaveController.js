const leaveServices = require('../services/leave');

const createLeave = async (req, res) => {
  try {
    const { username, startDate, endDate } = req.body;
    const newLeave = await leaveServices.createLeave(
      username,
      startDate,
      endDate,
    );
    return res.status(201).json({
      status: 201,
      data: newLeave,
      message: 'Succesfully Created Leave',
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
}; 

const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await leaveServices.deleteLeave(id);
    if (deleted[0] === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Leave Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: deleted,
      message: 'Succesfully Deleted Leave',
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const newLeave = req.body;
    const updated = await leaveServices.updateLeave(id, newLeave);
    if (updated[0] === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Leave Not Found',
      });
    }
    return res.status(200).json({ 
      status: 200,
      data: updated[1],
      message: 'Succesfully Updated Leave',
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const getLeavesByProjectId = async (req, res) => {
  try {
    const { projectId } = req.params;
    const leaves = await leaveServices.getLeavesByProjectId(projectId);
    if (leaves.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Leaves Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: leaves,
      message: 'Succesfully Retrieved Leaves',
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};

const getLeavesByUser = async (req, res) => {
  try {
    const { username } = req.params;
    const leaves = await leaveServices.getLeavesByUser(username);
    if (leaves.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Leaves Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      data: leaves,
      message: 'Succesfully Retrieved Leaves',
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};


module.exports = { createLeave, deleteLeave, updateLeave, getLeavesByProjectId, getLeavesByUser }; 

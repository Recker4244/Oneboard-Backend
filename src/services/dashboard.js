
const db = require('../models');
const checkPass = require('../utils/checkPass');

const getUsers = async () => {
  const result = await db.users.findAll();
  return result;
};

const checkAuth = async (uname, password) => {


  const foundUser = await db.users.findOne({
    where: {
      username: uname,
    },
  });

  if (!foundUser) return false;
  return await checkPass(password, foundUser.password);

};

module.exports = {
  getUsers,
  checkAuth,
};
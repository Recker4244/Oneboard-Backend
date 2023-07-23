const sequelize = require('sequelize');
const Teams = require('../models').teams;

async function roleInProjects( username ){
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();
  const lastYearSameDay = `${yyyy-1}-${mm}-${dd} 00:00:00`;
  
  const result = await Teams.findAll({
    attributes: [
      'role',
      [sequelize.fn('COUNT', sequelize.col('role')), 'countRoles']
    ],
    group: 'role',
    where: {
      username: username,
      end_date: {
        [sequelize.Op.gte]: lastYearSameDay,
      }
    }
  });
  return result.map(element => {
    return element.dataValues;
  });
}

module.exports = roleInProjects;
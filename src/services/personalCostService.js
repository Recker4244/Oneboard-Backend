const db = require('../models');

// let tempDB = [];
const createPersonalCost = async (projectId, username, cost) => {
  const resultArray = [];
  for (let i = 0; i < username.length; i++) {
    const result = await db.teams.create({
      project_id: projectId,
      username: username[i],
      cost: cost[i]
    });

    resultArray.push(result);
  }
  return resultArray;
  //   tempDB = resultArray;
};

const getPersonalCosts = async (projectId) => {
  const result = await db.teams.findAll({
    where: {
      project_id: projectId
    }
  });

  //   const result = tempDB.filter((item) => item.project_id === projectId);

  const sum = result.reduce((acc, cur) => acc + cur.cost, 0);
  return sum;
};

module.exports = { createPersonalCost, getPersonalCosts };


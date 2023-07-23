const db = require('../models');

const createSupplementaryCost = async (projectId, costType, amount) => {
  const resultAray = [];
  for (let i = 0; i < costType.length; i++) {
    const result = await db.cost.create({
      project_id: projectId,
      cost_type: costType[i],
      amount: amount[i]
    });
    resultAray.push(result);
  }
  return resultAray;
};

const getSupplementaryCosts = async (projectId) => {
  const result = await db.cost.findAll({
    where: {
      project_id: projectId
    }
  });
  const temp = result;
  // console.log(temp);
  const sum = temp.reduce((acc, cur) => acc + cur.amount, 0);
  return [result, sum];
};

module.exports = { createSupplementaryCost, getSupplementaryCosts };

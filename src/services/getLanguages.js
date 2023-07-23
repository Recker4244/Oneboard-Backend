const { getUserLanguageUsage,
  // getManagerLanguageUsage 
} = require('../utils/githubUtils/getLanguagesPerUserPerRepo');
const { getManagerLanguageUsage } = require('../utils/githubUtils/getManagerLanguages');
const redis = require('redis');
const client = redis.createClient();
client.connect();

const addUser = async (user) => {
  await getUserLanguageUsage(user);
  return await client.hGet('languageUsage', user, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

const addManager = async (user) => {
  await getManagerLanguageUsage(user);
  return await client.hGet('managerLanguages', user, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

const getLanguages = async (user) => {
  console.log('getLanguages called for user: ', user);
  let languages = await client.hGet('languageUsage', user);
  if (!languages) {
    // call getLanguagesPerUserPerRepo.js to get the data
    languages = await addUser(user);
  }
  //   console.log('getLanguages called for user: ', user);

  console.log(`languages for ${user}: `, JSON.parse(languages));
  return JSON.parse(languages);

};

const getManagerLanguages = async (user) => {
  console.log('getManagerLanguages called for user: ', user);
  let languages = await client.hGet('managerLanguages', user);
  if (!languages) {
    // call getLanguagesPerUserPerRepo.js to get the data
    languages = await addManager(user);
  }
  //   console.log('getLanguages called for user: ', user);

  console.log(`languages for ${user}: `, JSON.parse(languages));
  return JSON.parse(languages);

};

module.exports = {
  getLanguages,
  getManagerLanguages,
};
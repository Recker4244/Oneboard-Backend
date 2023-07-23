const { createAppAuth } = require('@octokit/auth-app');
const { Octokit } = require('@octokit/rest');
const { request } = require('@octokit/request');
const db = require('../../models'); 
// const fs = require('fs');

// console.log('*******', db);

const path = require('path');
const envPath = path.join(__dirname, '../../../.env');
require('dotenv').config({ path: envPath });

async function authenticate(orgNames) {
  const APP_ID = process.env.GITHUB_APP_IDENTIFIER;
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const auth = createAppAuth({
    appId: APP_ID,
    privateKey: PRIVATE_KEY
  });
  
  let authenticatedInstances = {};

  const requestWithAuth = request.defaults({
    request: {
      hook: auth.hook,
    },
  });
  
  const { data: installations } = await requestWithAuth('GET /app/installations');

  for (const orgName of orgNames) {
    const installation = installations.find(
      (i) => i.account.login === orgName
    );

    // console.log(installation);
  
    if (!installation) {
      throw new Error(`Installation not found for org "${orgName}"`);
    }
  
    const { token } = await auth({ type: 'installation', installationId: installation.id });
    authenticatedInstances[orgName] = new Octokit({
      auth: token
    });
  }
  // write to file
  // fs.writeFileSync('authenticatedInstances.json', JSON.stringify(authenticatedInstances));
  // console.log('authenticatedInstances', authenticatedInstances);
  return authenticatedInstances;
}

const fetchOrgNames = async () => {
  const alllinks = await db.links.findAll();
  // filter out links that are github links
  const githublinks = alllinks.filter(link => link.url.includes('github.com'));
  // get github org names from links
  const orgNames = githublinks.map(link => {
    const url = link.url;
    const orgName =url.split('github.com/')[1].includes('orgs')?url.split('github.com/')[1].split('/')[1]: url.split('github.com/')[1].split('/')[0];
    return orgName;
  });

  // remove duplicates
  const uniqueOrgNames = [...new Set(orgNames)];
  return uniqueOrgNames;
};

const githubAuth = async () => {
  const orgNames = await fetchOrgNames();
  const authenticatedInstances = await authenticate(orgNames);
  return authenticatedInstances;
};

module.exports = {
  githubAuth,
  fetchOrgNames,
  authenticate
};
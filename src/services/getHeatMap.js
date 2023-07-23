const redis = require('redis');
const client = redis.createClient();
client.connect();

// if heatmap is not in redis, get it from github

const getHeatMapFromGithub = async () => {
  console.log('heatmap not in redis');
  const heatmap = await getHeatMapFromGithub();
  client.hSet('commitCount', heatmap, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('heatmap saved to redis');
    }
  });
  return heatmap;
};


const getHeatMap = async () => {
  console.log('getHeatMap called');
  let heatmap = await client.hGetAll('commitCount');
  if (!heatmap) {
    heatmap = await getHeatMapFromGithub();
  }
  
  console.log('heatmap: ', heatmap);
  return heatmap;
//   return new Promise((resolve, reject) => {
//     client.hGetAll('commitCount', (err, result) => {
//       if (err) {
//         reject(err);
//         console.log('getHeatMap rejected');
//       }
//       resolve(result);
//       console.log('getHeatMap resolved');
//     });
//   }
//   );
};

module.exports = getHeatMap;
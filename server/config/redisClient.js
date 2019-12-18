const asyncRedis = require("async-redis");
const fetch = require('node-fetch');
const REDIS_PORT = process.env.PORT || 6379

const client = asyncRedis.createClient({port: REDIS_PORT, password: 'aljezur99'});

const sendResponse = (key, data) => {
  console.log(`Set ${key} with this data: ${data}`);
}

module.exports = {
  getRepos: async (username) => {
    try {
      console.log('fetching data...');
      const res = await fetch(`https://api.github.com/users/${username}`)
      const data = await res.json()
      console.log(data);
    } catch (e) {
      console.log('error: ', e);
      res.status(500)
    }
  },

  setContent: (key, data) => {
    // set in redis the key, expiration (1h) and the value
    client.setex(key, 3600, data)
    sendResponse(key, data)
  },

  fetchContent: async key => {
    let data = await client.get(key)
    return JSON.parse(data)
  }
}

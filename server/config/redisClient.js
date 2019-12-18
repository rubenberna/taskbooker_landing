const asyncRedis = require("async-redis");
const REDIS_PORT = process.env.PORT || 6379

const client = asyncRedis.createClient({port: REDIS_PORT, password: process.env.REDIS_PASSWORD});

const sendResponse = (key) => {
  console.log(`Set ${key} in redis`);
}

module.exports = {
  setPageContent: (key, data) => {
    // set in redis the key, expiration (1h) and the value
    client.setex(key, 3600, data)
    sendResponse(key)
  },

  fetchPageContent: async (key) => {
    let data = await client.get(key)
    return JSON.parse(data)
  }
}

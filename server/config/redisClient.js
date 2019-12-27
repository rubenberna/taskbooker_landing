const asyncRedis = require("async-redis");
var redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379

async function defineClient() {
  if(process.env.NODE_ENV !== 'production') {
    const client = await asyncRedis.createClient({port: REDIS_PORT, password: process.env.REDIS_PASSWORD})
    return client
  }
  else {
    const client = await asyncRedis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});
    return client
  }
}

const sendResponse = (key) => {
  console.log(`Set ${key} in redis`);
}

module.exports = {
  setPageContent: async (key, data) => {
    // set in redis the key, expiration (1h) and the value
    try {
      const client = await defineClient()
      client.setex(key, 3600, data)
      client.quit()
      sendResponse(key)
    } catch (e) {
      console.log('error: ', e);
    }
  },

  setUrlIds: async data => {
    try {
      const client = await defineClient()
      client.setex('urls', 3600, data)
      client.quit()
      sendResponse(key)
    } catch (e) {
      console.log('error: ', e);
    }
  },

  fetchPageContent: async (key) => {
    try {
      const client = await defineClient()
      let data = await client.get(key)
      client.quit()
      return JSON.parse(data)
    } catch (e) {
      console.log('error: ', e);
    }
  },

  fitlerTable: async filters => {
    try {
      const client = await defineClient()
      const { selectedCategory, selectedProvince } = filters;
      let data = await client.get('tableContent')
      let array = await JSON.parse(data)
      let filteredResults = await array.filter(t => t.Province === selectedProvince && t.Breadcrumb1 === selectedCategory)
      client.quit()
      return filteredResults
    } catch (e) {
      console.log('error: ', e);
    }
  },

  searchId: async url => {
    try {
      const client = await defineClient()
      let data = await client.hgetall(key)

    } catch (e) {

    }
  }
}

const asyncRedis = require("async-redis");
var redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379

const client = defineClient()

function defineClient() {
  if(process.env.NODE_ENV !== 'production') return asyncRedis.createClient({port: REDIS_PORT, password: process.env.REDIS_PASSWORD})
  else return asyncRedis.createClient(process.env.REDISCLOUD_URL, {no_ready_check: true});
}

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
  },

  fitlerTable: async filters => {
    defineClient()
    const { selectedCategory, selectedCity } = filters
    let data = await client.get('tableContent')
    let array = await JSON.parse(data)
    console.log('array: ', selectedCategory, selectedCity);
    let filteredResults = await array.filter(t => t.CityPostalcode === selectedCity && (t.Breadcrumb1 === selectedCategory || t.Breadcrumb2 === selectedCategory ||  t.Breadcrumb3 === selectedCategory))
    return filteredResults
  }
}

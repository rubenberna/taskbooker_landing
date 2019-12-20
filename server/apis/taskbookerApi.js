const axios = require('axios');

const taskbookerApi = axios.create({
  baseURL: "https://api.stg.taskbooker.be/graphql/",
  headers: { "Content-Type": "application/json", "Api-Key": process.env.TASKBOOKER_API_KEY}
})

module.exports = taskbookerApi

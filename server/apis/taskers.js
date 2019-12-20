const fetch = require('node-fetch');
const axios = require('axios');

const baseURL = "https://api.stg.taskbooker.be/graphql"

const getCategoryID = async url => {
  const q = `
  {
    getCategory(url: "${url}") {
      id
    }
  }
  `
  const body = JSON.stringify({ query: q })
  const res = await axios.post(baseURL, body, {
    headers: { "Content-Type": "application/json", "Api-Key": process.env.TASKBOOKER_API_KEY},
  })
  const { data } = res.data
  return data.getCategory.id
}

const getTaskers = async (categoryId, location) => {
  let locationQuery = typeof location === 'object' ? `location: {lat: ${location.latitude}, lon: ${location.longitude}}` : `city: "${location.split('-')[0]}"`

  const q = `
  {
    listActiveUsers(filter:{categoryIds:["${categoryId}"], ${locationQuery}, roles:["tasker", "protasker"], radius: 20}, size: 6) {
      records {
        nodes {
          id,
          avatar {
            url
          },
          prettyName,
          price,
          rating,
          price,
          description,
          categories {
              nodes {
              title
            }
          }
        }
      }
    }
  }
  `;

  const body = JSON.stringify({ query: q })
  const res = await axios.post(baseURL, body, {
    headers: { "Content-Type": "application/json", "Api-Key": process.env.TASKBOOKER_API_KEY},
  })
  const { data } = res.data
  return data.listActiveUsers.records.nodes
}

module.exports = {
  fetch: async ({categoryToBeSearched, location}) => {
    let categoryId = await getCategoryID(categoryToBeSearched)
    let taskers = await getTaskers(categoryId, location)
    return taskers
  }
}

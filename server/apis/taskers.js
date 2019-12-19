const fetch = require('node-fetch');

const getTaskers = async obj => {
  console.log("tasker: ", obj);
  const q = `
  {
    listActiveUsers(filter:{categoryIds:["b591a956-10aa-4bfb-bad4-92ddfb8b81a6"]}) {
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
  const apiKey = process.env.TASKBOOKER_API_KEY
  return fetch("https://api.stg.taskbooker.be/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Api-Key": apiKey},
    body: JSON.stringify({ query: q })
  })
    .then(response => response.json())
    .then(t => t.data.listActiveUsers.records.nodes)
};

module.exports = getTaskers;

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

  return fetch("https://api.stg.taskbooker.be/public/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: q })
  })
    .then(response => response.json())
    .then(t => t.data.listActiveUsers.records.nodes);
};

module.exports = getTaskers;

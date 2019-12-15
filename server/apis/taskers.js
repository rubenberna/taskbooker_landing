const gql = require('graphql-tag');
const ApolloClient = require('apollo-boost').ApolloClient;
const fetch = require('cross-fetch/polyfill').fetch;
const createHttpLink = require('apollo-link-http').createHttpLink;
const InMemoryCache = require('apollo-cache-inmemory').InMemoryCache;


const client = new ApolloClient({
  link: createHttpLink({
    uri: "https://api.stg.taskbooker.be/public/graphql",
    fetch: fetch
  }),
  cache: new InMemoryCache()
});

const params = gql`
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
`

const fetchTaskers = async () => {
  try {
    const data = await client.query({ query: params})
    const obj = Object.values(data)[0]
    const taskers = obj.listActiveUsers.records.nodes
    return taskers
  } catch (e) {
    console.log('error: ', e);
  }
}

module.exports = fetchTaskers

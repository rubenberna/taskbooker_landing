let React = require('react');
let ReactDOM = require('react-dom');
let TaskersList = require('./components/Taskerslist');

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

fetch('https://api.stg.taskbooker.be/public/graphql', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ query: q })})
.then((response) => response.json())
.then((t) => {
   console.log(t.data.listActiveUsers.records.nodes);
    let App = ({taskers}) => <div>{JSON.stringify(taskers)} <TaskersList></TaskersList></div>
    ReactDOM.render(<App taskers={t} />, document.querySelector("#app"));
});


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
.then((response) => response.text())
.then((t) => {
    let App = ({taskers}) => <div>{JSON.stringify(taskers)} </div>
    ReactDOM.render(<App taskers={t} />, document.querySelector("#app"));
}); 



const React = require('react');
const axios = require('axios');

const limitResults = 200

class FilterTable extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      category: 'evenementen',
      city: 'aartselaar-2630'
    }
  }

  async componentDidMount() {
    const res = await axios.post('/queryRedis', {limitResults})
    const data  = res.data
    console.log(data);
    this.setState({ list: data })
  }

  addFilter(name, value) {
    let change = {}
    change[name] = value
    this.setState({ change })
    this.filterResults()
  }

  async filterResults() {
    const { category, city } = this.state
    const res = await axios.post('/queryRedis/filter', {category, city})
    const data  = res.data
    this.setState({ list: data })
  }

  render() {
    const { list } = this.state
    return(
      <div className='container'>
        <button onClick={ this.filterResults.bind(this) }>Filter</button>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">URL</th>
              <th scope="col">Breadcrumb1</th>
              <th scope="col">Breadcrumb2</th>
              <th scope="col">Breadcrumb3</th>
              <th scope="col">CityPostalcode</th>
            </tr>
          </thead>
          <tbody>
        {list.map((item, i) =>
          <tr key={item._id}>
            <td>{i}</td>
            <td>{item.URL}</td>
            <td>{item.Breadcrumb1}</td>
            <td>{item.Breadcrumb2}</td>
            <td>{item.Breadcrumb3}</td>
            <td>{item.CityPostalcode}</td>
          </tr>
        )}
        </tbody>
        </table>
      </div>
    )
  }
}

module.exports = FilterTable;

const React = require('react');
const axios = require('axios');

class FilterTable extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      category: '',
      city: ''
    }
  }

  async componentDidMount() {
    const res = await axios.get('/queryRedis')
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

  async filterResults(){
    // 1. filter array based on state
    // 2. set state list based on new array
  }

  render() {
    const { list } = this.state
    return(
      <div>
        <button onClick={e => this.addFilter('category', 'wiskunde')  }>Filter</button>
        {list.map(item => <p key={item._id}>{item.URL}</p>)}
      </div>
    )
  }
}

module.exports = FilterTable;

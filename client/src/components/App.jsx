let React = require('react');
let getTaskers = require('../../../server/apis/taskers');
let TaskersList = require('./Taskerslist');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      taskers: []
    };
  }

  async componentDidMount() {
    let URLParams = window.location.pathname.split('/')
    // search taskers per last category
    let categoryToBeSearched = URLParams.length === 4 ? URLParams[URLParams.length -2] : URLParams[URLParams.length -1]
    const res = await getTaskers(categoryToBeSearched)
    this.setState({ taskers: res })
  }

  render() {
    return (
      <div>
        <TaskersList taskers={this.state.taskers}/>
      </div>
    );
  }
}
module.exports = App;

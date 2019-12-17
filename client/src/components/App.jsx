let React = require('react');
let getTaskers = require('../../../server/apis/taskers');
let TaskersList = require('./banners/Taskerslist');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      taskers: [],
      lat: null,
      long: null,
      error: ''
    };
  }

  // location has a postcode (i.e. "2680"), which we use to get the city or coords, and subcategory to fetch taskers
  async componentDidMount() {
    let URLParams = window.location.pathname.split('/')
    const lastParam = URLParams[URLParams.length -1]
    let categoryToBeSearched = /[0-9]/.test(lastParam) ? URLParams[URLParams.length -2] : lastParam
    let location = /[0-9]/.test(lastParam) ? lastParam : await this.fetchCoordinates()

    const filters = {
      categoryToBeSearched,
      location
    }
    this.fetchTaskers(filters)
  }

  getCurrentPosition() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }

  async fetchCoordinates(){
    try {
        const { coords } = await this.getCurrentPosition();
        const { latitude, longitude } = coords;
        return { latitude, longitude }
    } catch (error) {
        return error
    }
  }

  async fetchTaskers(filters) {
    const res = await getTaskers(filters)
    this.setState({ taskers: res })
  }

  render() {
    return  <TaskersList taskers={this.state.taskers}/>

  }
}
module.exports = App;

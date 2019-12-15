let React = require('react');
let getTaskers = require('../../../server/apis/taskers');

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
    console.log(res);
    this.setState({ taskers: res })
  }

  renderTaskers() {
    const { taskers } = this.state
    if(taskers.length) {
      return taskers.map(t =>
          (<div key={t.id}>
            <p><span style={{ fontWeight: 600 }}>id:</span>{t.id}</p>
          </div>
        )
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderTaskers()}
      </div>
    );
  }
}
module.exports = App;

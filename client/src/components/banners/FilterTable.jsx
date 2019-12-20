const React = require('react');
const axios = require('axios');

const limitResults = 200

class FilterTable extends React.Component {
  constructor() {
    super();
    this.state = {
      tableList: [],
      selectedCategory: '',
      selectedCity: '',
      citiesList: [],
      categoriesList: []
    }
  }

  async componentDidMount() {
    const res = await axios.post('/queryRedis', {limitResults})
    const data  = res.data
    this.setState({
      tableList: data.shortlist,
      categoriesList: data.uniqueCategories,
      citiesList: data.uniqueCities
    })
  }


  async handleCategory(e) {
    await this.setState({ selectedCategory : e.target.value })
    this.filterResults()
  }
  async handleCity(e) {
    await this.setState({ selectedCity : e.target.value })
    this.filterResults()
  }

  async filterResults() {
    const {selectedCategory, selectedCity} = this.state;
    const res = await axios.post('/queryRedis/filter', {selectedCategory, selectedCity})
    const data  = res.data
    this.setState({ tableList: data })
  }

  render() {
    const { tableList , citiesList , categoriesList } = this.state
    return(
      <div className='container'>
        <div className="seo-pages-cities-select">
        <label>
          
          <span>Activity</span>
          <span class="select-wrapper">
          <select onChange={this.handleCategory.bind(this)} className="select">
        
            {categoriesList.map(category =>
              
              <option key={category} value={category}>
                {category}
              </option>
            )}
          </select>
          </span>
        </label>
        <label>
          <span>Province</span>
          <select onChange={this.handleCity.bind(this)} className="select">
              <option></option>
            {citiesList.map(cityCodePostal =>
              <option key={cityCodePostal} value={cityCodePostal}>
                {cityCodePostal}
              </option>
            )}
          </select>
        </label>
        </div>
    
        <ul className="seo-pages-cities-list">
              {tableList.map((item, i) =>
                <li key={item._id} className="seo-pages-cities-item">
                  <a href={item.URL}>
                  {item.Breadcrumb1.replace(/-/g, ' ').charAt(0).toUpperCase() + item.Breadcrumb1.replace(/-/g, ' ').slice(1)}  {item.Breadcrumb2.replace(/-/g, ' ')} 
                    {item.Breadcrumb3.replace(/-/g, ' ')} {item.CityPostalcode.replace(/-/g, ' ')}
                  </a>
                </li>
                )}
              </ul>
    
      </div>
      
    )
  }
}

module.exports = FilterTable;
const React = require("react");
const axios = require("axios");

const limitResults = 200;

class FilterTable extends React.Component {
  constructor() {
    super();
    this.state = {
      tableList: [],
      selectedCategory: '',
      selectedProvince: '',
      provinceList: [],
      categoriesList: []
    };
  }

  async componentDidMount() {
    const res = await axios.post("/queryRedis", { limitResults });
    const data = res.data;
    this.setState({
      tableList: data.shortlist,
      categoriesList: data.uniqueCategories,
      provinceList: data.uniqueProvinces
    });
  }

  async handleCategory(e) {
    await this.setState({ selectedCategory: e.target.value });
    this.filterResults();
  }
  async handleProvince(e) {
    await this.setState({ selectedProvince: e.target.value });
    this.filterResults();
  }

  async filterResults() {
    const { selectedCategory, selectedProvince } = this.state;
    const res = await axios.post("/queryRedis/filter", {
      selectedCategory,
      selectedProvince
    });
    const data = res.data;
    this.setState({ tableList: data });
  }

  render() {
    const { tableList, provinceList, categoriesList } = this.state;
    return (
      <div className="container">
        <div className="seo-pages-cities-select">
          <label>
            <span className='select-title'>Activity</span>
            <span className="select-wrapper">
              <select
                onChange={this.handleCategory.bind(this)}
                className="select"
              >
                <option></option>
                {categoriesList.map((category, i) => (
                  <option key={`${category}${i}`} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </span>
          </label>
          <label>
            <span className='select-title'>Province</span>
            <select onChange={this.handleProvince.bind(this)} className="select">
              <option></option>
              {provinceList.map((province, i) => (
                <option key={`${province}${i}`} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ul className="seo-pages-cities-list">
          {tableList.map((item, i) => (
            <li key={item._id} className="seo-pages-cities-item">
              <a href={item.URL.replace("www.taskbooker.be/", "")}>
                {item.Breadcrumb1.replace(/-/g, " ")
                  .charAt(0)
                  .toUpperCase() +
                  item.Breadcrumb1.replace(/-/g, " ").slice(1)}{" "}
                <span className='filter-table-city'>{item.CityPostalcode}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

module.exports = FilterTable;

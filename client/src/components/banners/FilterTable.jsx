const React = require("react");
const axios = require("axios");

const limitResults = 200;

class FilterTable extends React.Component {
  constructor() {
    super();
    this.state = {
      citiesPostalcode: [],
      categories: [],
      list: [],
      category: "",
      city: ""
    };
  }

  async componentDidMount() {
    try {
      const res = await axios.post("/queryRedis", { limitResults });
      this.filterData(res.data);
      this.getData(this.state.category,this.state.cityCodePostal);
    } catch (error) {
      console.log("manar", error);
    }
  }

  handleCategory(e) {
    this.getData(e.target.value, null);
  }
  handleCity(e) {
    this.getData(null, e.target.value);
  }

  filterData(arr) {
    let categoryList = [],
      cityCodePostalList = [];
    arr.map(obj => {
      for (let i = 1; i <= 3; i++) {
        const value = obj["Breadcrumb" + i];
        if (value != "" && !categoryList.includes(value)) {
          categoryList.push(value);
        }
      }
      const codePostal = obj.CityPostalcode;
      if (codePostal != "" && !cityCodePostalList.includes(codePostal)) {
        cityCodePostalList.push(codePostal);
      }
    });
    this.setState({
      categories: categoryList,
      citiesPostalcode: cityCodePostalList
    });
  }

  async getData(category, city) {
   
      const res = await axios.post("/queryRedis/filter", { category, city });
      const data = res.data;
      this.setState({ list: data });
   
  }

  render() {
    const { categories, citiesPostalcode,list } = this.state;
    return (
      <div className="container">
        <label>
          Activity
          <select onChange={this.handleCategory.bind(this)}>
            {categories.map(category =>
              <option key={category} value={category}>
                {category}
              </option>
            )}
          </select>
        </label>
        <label>
          City
          <select onChange={this.handleCity.bind(this)}>
            {citiesPostalcode.map(cityCodePostal =>
              <option key={cityCodePostal} value={cityCodePostal}>
                {cityCodePostal}
              </option>
            )}
          </select>
        </label>
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
                <td>
                  {i}
                </td>
                <td>
                  {item.URL}
                </td>
                <td>
                  {item.Breadcrumb1}
                </td>
                <td>
                  {item.Breadcrumb2}
                </td>
                <td>
                  {item.Breadcrumb3}
                </td>
                <td>
                  {item.CityPostalcode}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

module.exports = FilterTable;

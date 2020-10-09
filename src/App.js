import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './components/header/Header';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      allCountries: [],
      filteredCountries: [],
      filteredPopularion: 0,
      filter: '',
    };
  }
  async componentDidMount() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();
    const allCountries = json.map(({ name, numericCode, flag, population }) => {
      return {
        id: numericCode,
        name,
        filterName: name.toLowerCase(),
        flag,
        population,
      };
    });
    this.setState({
      allCountries: allCountries,
      filtredCountries: Object.assign([], allCountries),
    });
  }
  handleChangeFilter = (newText) => {
    this.setState({
      filter: newText,
    });
    const filterLowerCase = newText.toLowerCase();
    const filteredCountries = this.state.allCountries.filter((country) => {
      return country.filterName.includes(filterLowerCase);
    });
    const filteredPopularion = filteredCountries.reduce((acc, cur) => {
      return acc + cur.population;
    }, 0);
    this.setState({
      filteredCountries,
      filteredPopularion,
    });
  };
  render() {
    const { filteredCountries, filter, filteredPopularion } = this.state;
    return (
      <div className="container">
        <h1>React Countries</h1>
        <Header
          filter={filter}
          countryCount={filteredCountries.length}
          totalPopulation={filteredPopularion}
          onChangeFilter={this.handleChangeFilter}
        />
        <Countries countries={filteredCountries} />
      </div>
    );
  }
}

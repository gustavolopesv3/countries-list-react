import React, { Component } from 'react';

export default class Header extends Component {
  handleInputChange = (event) => {
    const newText = event.target.value;
    this.props.onChangeFilter(newText);
  };
  render() {
    const { filter, countryCount, totalPopulation } = this.props;
    return (
      <div>
        {/* mostrar texto digitao no input */}
        <input type="text" value={filter} onChange={this.handleInputChange} />
        <span>Paises:{countryCount}</span>
        <span> | População:{totalPopulation}</span>
      </div>
    );
  }
}

import React, { Component } from 'react';
import { SearchProps } from '../types';

class Search extends Component<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
    this.inputChange = this.inputChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  inputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { setQuery } = this.props;
    setQuery(event.target.value);
  }

  formSubmit(event: React.FormEvent) {
    const { formSubmit, query } = this.props;
    event.preventDefault();
    formSubmit(query, event);
  }

  render() {
    const { query } = this.props;

    return (
      <div className="search-form">
        <form
          className="search-form-wrapper"
          onSubmit={this.formSubmit}
        >
          <input
            type="text"
            name="search"
            className="search"
            placeholder="Search"
            autoComplete="off"
            value={query}
            onChange={this.inputChange}
          />
          <button type="submit" className="button"></button>
        </form>
      </div>
    );
  }
}

export default Search;

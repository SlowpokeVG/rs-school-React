import { Component } from 'react';
import Title from '../components/Title';
import Search from '../components/Search';
import { SearchProps } from '../types';

class TopControls extends Component<SearchProps> {
  render() {
    const { formSubmit, query, setQuery } = this.props;

    return (
      <section className="top">
        <Title />
        <Search formSubmit={formSubmit} query={query} setQuery={setQuery} />
      </section>
    );
  }
}

export default TopControls;

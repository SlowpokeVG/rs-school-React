import React, { Component } from 'react';
import { search, trending } from './scripts/api';
import { ApiResponse, Gif } from './types';

import './assets/css/style.css';
import './assets/css/responsive.css';

import TopControls from './sections/TopControls';
import Results from './sections/Results';
import Loader from './ui/Loader';
import Error from './ui/Error';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './sections/ErrorButton';

class App extends Component {
  state = {
    gifs: [] as Gif[],
    error: null as string | null | undefined,
    loading: true,
    query: '',
  };

  componentDidMount() {
    const storedQuery = localStorage.getItem('query');
    if (storedQuery) {
      this.setState({ query: storedQuery });
      this.fetchGifs(storedQuery);
    } else {
      this.fetchTrends();
    }
  }

  fetchTrends = async () => {
    this.setState({ loading: true });
    const result = await trending();
    const data: ApiResponse | undefined = result.data;
    if (result.success && data) {
      this.setState({ gifs: data.data });
    } else {
      this.setState({ error: result.error });
    }
    this.setState({ loading: false });
  };

  fetchGifs = async (query: string) => {
    this.setState({ loading: true });
    const result = await search(query);
    const data: ApiResponse | undefined = result.data;
    if (result.success && data) {
      this.setState({ gifs: data.data });
    } else {
      this.setState({ error: result.error });
    }
    this.setState({ loading: false });
  };

  formSubmit = (query: string, event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem('query', query);
    this.setState({ query });
    this.fetchGifs(query);
  };

  render() {
    const { gifs, error, loading, query } = this.state;

    return (
      <ErrorBoundary>
        <main>
          <TopControls
            formSubmit={this.formSubmit}
            query={query}
            setQuery={(query: string) => this.setState({ query })}
          />

          {loading && <Loader />}
          {error && <Error error={error} />}
          {!loading && !error && <Results gifs={gifs} />}
          <ErrorButton />
        </main>
      </ErrorBoundary>
    );
  }
}

export default App;

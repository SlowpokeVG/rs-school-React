import { useState, useEffect, FormEvent } from 'react';
import { search, trending } from './scripts/api';
import { ApiResponse, Gif } from './types';

import './assets/css/style.css';
import './assets/css/responsive.css';

import TopControls from './sections/TopControls';
import Results from './sections/Results';
import Loader from './ui/Loader';
import Error from './ui/Error';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';

function App() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [error, setError] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const storedQuery = localStorage.getItem('query');
    if (storedQuery) {
      setQuery(storedQuery);
      fetchGifs(storedQuery);
    } else {
      fetchGifs();
    }
  }, []);

  const fetchGifs = async (query?: string) => {
    setLoading(true);
    setError(null);
    const result = query ? await search(query) : await trending();
    const data: ApiResponse | undefined = result.data;

    if (result.success && data) {
      setGifs(data.data);
    } else {
      setError(result.error || 'Failed to load GIFs.');
    }

    setLoading(false);
  };

  const formSubmit = (query: string, event: FormEvent) => {
    event.preventDefault();
    localStorage.setItem('query', query);
    setQuery(query);
    fetchGifs(query);
  };

  return (
    <ErrorBoundary>
      <main>
        <TopControls
          formSubmit={formSubmit}
          query={query}
          setQuery={setQuery}
        />

        {loading && <Loader />}
        {error && <Error error={error} />}
        {!loading && !error && <Results gifs={gifs} />}
        <ErrorButton />
      </main>
    </ErrorBoundary>
  );
}

export default App;

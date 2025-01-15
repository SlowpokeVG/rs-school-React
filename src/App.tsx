import { useState, useEffect } from 'react';
import { search, treanding } from './scripts/api';
import { ApiResponse, Gif } from './types';

import './assets/css/style.css';
import './assets/css/responsive.css';

import TopControls from './sections/TopControls';
import Results from './sections/Results';
import Loader from './ui/Loader';
import Error from './ui/Error';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [error, setError] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');

  const fetchTrends = async () => {
    setLoading(true);
    const result = await treanding();
    const data: ApiResponse | undefined = result.data;
    if (result.success && data) {
      setGifs(data.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  const fetchGifs = async (query: string) => {
    setLoading(true);
    const result = await search(query);
    const data: ApiResponse | undefined = result.data;
    if (result.success && data) {
      setGifs(data.data);
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  useEffect(() => {
    const storedQuery = localStorage.getItem('query');
    if (storedQuery) {
      setQuery(storedQuery);
      fetchGifs(storedQuery);
    } else {
      fetchTrends();
    }
  }, []);

  const formSubmit = (query: string, event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem('query', query);
    setQuery(query);
    fetchGifs(query);
  };

  return (
    <>
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
        </main>
      </ErrorBoundary>
    </>
  );
}

export default App;

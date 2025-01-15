import { useState, useEffect } from 'react';
import { search, treanding } from './scripts/api';
import { ApiResponse, Gif } from './types';

import './assets/css/style.css';
import './assets/css/responsive.css';

import TopControls from './sections/TopControls';
import Results from './sections/Results';

function App() {

  const [gifs, setGifs] = useState<Gif[]>([]);
  const [error, setError] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    fetchTrends();
  }, []);

  const formSubmit = (query: string, event: React.FormEvent) => {
    event.preventDefault();
    fetchGifs(query);
  };

  return (
    <>
      <main>
        <TopControls formSubmit={formSubmit} />
        
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <Results gifs={gifs} />
        )}
        
      </main>
    </>
  );
}

export default App;

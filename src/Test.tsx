import { useState, useEffect } from 'react';
import './assets/css/style.css';
import './assets/css/responsive.css';

import TopControls from './sections/TopControls';
import Results from './sections/Results';

import { treanding } from './scripts/api';
import { ApiResponse, Gif } from './types';

function Test() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [error, setError] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGifs = async () => {
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

    fetchGifs();
    console.log(gifs);
    console.log(error);
    console.log(loading);
  });

  return (
    <>
      <main>
        <TopControls />
        <Results />
      </main>
    </>
  );
}

export default Test;

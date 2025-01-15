import { useState, useEffect } from 'react';
import ResultItem from '../components/ResultItem';

import { treanding } from '../scripts/api';
import { ApiResponse, Gif } from '../types';

function ResultItems() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [error, setError] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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

    fetchTrends();
  }, []);

  return (
    <div className="results-items show-items">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          {gifs.map((gif) => (
            <ResultItem key={gif.id} gif={gif} />
          ))}
        </>
      )}
    </div>
  );
}

export default ResultItems;

import { useState, useEffect, FormEvent } from 'react';
import { search, trending } from './api';
import { ApiResponse, Gif } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';

function useAppLogic() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [error, setError] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useLocalStorage('query', '');

  useEffect(() => {
    if (query != undefined) {
      fetchGifs(query);
    }
  }, [query]);

  const fetchGifs = async (query: string) => {
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
    setQuery(query);
    fetchGifs(query);
  };

  return {
    gifs,
    error,
    loading,
    query,
    setQuery,
    formSubmit,
  };
}

export default useAppLogic;

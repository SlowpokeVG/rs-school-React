import { useState, useEffect, FormEvent } from 'react';
import { search, trending } from './api';
import { ApiResponse, Gif } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate, useParams } from 'react-router-dom';

function useAppLogic() {
  const { page } = useParams<{ page: string }>();
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [error, setError] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useLocalStorage('query', '');
  const [pagesCount, setPagesCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (query != undefined) {
      fetchGifs(query);
    }
  }, [query, page]);

  const currentPage: number = page ? parseInt(page) || 1 : 1;
  const perPage: number = 24;

  const fetchGifs = async (query: string) => {
    setLoading(true);
    setError(null);
    const result = query
      ? await search(query, perPage * (currentPage - 1))
      : await trending(perPage * (currentPage - 1));
    const data: ApiResponse | undefined = result.data;
    if (result.success && data) {
      const totalCount = data.pagination?.total_count
        ? data.pagination.total_count
        : 1;
      setGifs(data.data);
      setPagesCount(Math.ceil(totalCount / 26));
    } else {
      setError(result.error || 'Failed to load GIFs.');
      setPagesCount(1);
    }
    setLoading(false);
  };

  const formSubmit = (query: string, event: FormEvent) => {
    event.preventDefault();
    navigate('/');
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
    pagesCount,
  };
}

export default useAppLogic;

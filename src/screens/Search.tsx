import TopControls from '../sections/TopControls';
import Results from '../sections/Results';
import Loader from '../ui/Loader';
import Error from '../ui/Error';
import ErrorButton from '../components/ErrorButton';
import Pagination from '../components/Pagination';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ApiResponse, Gif } from '../types';
import { search, trending } from '../scripts/api';
import useLocalStorage from '../hooks/useLocalStorage';
import { ThemeContext } from '../context/themeContext';
import Flyout from '../components/Flyout';

function SearchScreen() {
  const { theme } = useContext(ThemeContext);
  const [query] = useLocalStorage('query', '');
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [error, setError] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState(true);
  const [pagesCount, setPagesCount] = useState(1);

  const perPage: number = 24;

  const fetchGifs = useCallback(
    async (query: string) => {
      const currentPage: number = page ? parseInt(page) || 1 : 1;
      setLoading(true);
      setError(null);
      const result = query
        ? await search(query, perPage * (currentPage - 1))
        : await trending(perPage * (currentPage - 1));

      if (result && result.success && result.data) {
        const data: ApiResponse | undefined = result.data;
        const totalCount = data.pagination?.total_count
          ? data.pagination.total_count
          : 1;
        setGifs(data.data);
        setPagesCount(Math.ceil(totalCount / 26));
      } else {
        setError(result ? result.error : 'Failed to load GIFs.');
        setPagesCount(1);
      }
      setLoading(false);
    },
    [page]
  );

  useEffect(() => {
    if (query != undefined) {
      fetchGifs(query);
    }
  }, [fetchGifs, query]);

  return (
    <main className={theme + '-theme'}>
      <TopControls fetchGifs={fetchGifs} />

      {loading && <Loader />}
      {error && <Error error={error} />}
      {!loading && !error && <Results gifs={gifs} />}
      <ErrorButton />
      <Pagination pagesCount={pagesCount} />
      <Flyout />
    </main>
  );
}

export default SearchScreen;

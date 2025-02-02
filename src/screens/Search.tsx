import TopControls from '../sections/TopControls';
import Results from '../sections/Results';
import Loader from '../ui/Loader';
import Error from '../ui/Error';
import ErrorButton from '../components/ErrorButton';
import useAppLogic from '../scripts/appLogic';
import Pagination from '../components/Pagination';
import { useEffect } from 'react';

function SearchScreen() {
  const {
    gifs,
    error,
    loading,
    query,
    setQuery,
    formSubmit,
    pagesCount,
    fetchGifs,
  } = useAppLogic();

  useEffect(() => {
    if (query != undefined) {
      fetchGifs(query);
    }
  }, [fetchGifs, query]);

  return (
    <main>
      <TopControls formSubmit={formSubmit} query={query} setQuery={setQuery} />

      {loading && <Loader />}
      {error && <Error error={error} />}
      {!loading && !error && <Results gifs={gifs} />}
      <ErrorButton />
      <Pagination pagesCount={pagesCount} />
    </main>
  );
}

export default SearchScreen;

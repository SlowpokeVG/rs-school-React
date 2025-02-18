import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useSearchGifsQuery } from '../redux/api';
import { ThemeContext } from '../context/themeContext';
import TopControls from '../sections/TopControls';
import Results from '../sections/Results';
import Loader from '../ui/Loader';
import Error from '../ui/Error';
import ErrorButton from '../components/ErrorButton';
import Pagination from '../components/Pagination';
import Flyout from '../components/Flyout';
import { useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { setCurrentData } from '../redux/slices/currentPageSlice';

function SearchScreen() {
  const dispatch = useDispatch();

  const [savedQuery] = useLocalStorage('query', '');
  const { theme } = useContext(ThemeContext);
  const query =
    useSelector((state: { search: { query: string } }) => state.search.query) ||
    savedQuery;

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const perPage = 24;
  const currentPage: number = page ? parseInt(page) || 1 : 1;
  const { data, error, isLoading } = useSearchGifsQuery({
    query,
    offset: perPage * (currentPage - 1),
  });
  const pagesCount = data
    ? Math.ceil((data.pagination?.total_count ?? 0) / perPage)
    : 1;

  useEffect(() => {
    if (data) {
      dispatch(setCurrentData(data.data));
    }
  }, [data, dispatch]);

  return (
    <main className={theme + '-theme'}>
      <div className="container">
        <TopControls />

        {isLoading && <Loader />}
        {error && <Error error={error} />}
        {!isLoading && !error && <Results />}
        <ErrorButton />
        <Pagination pagesCount={pagesCount} />
        <Flyout />
      </div>
    </main>
  );
}

export default SearchScreen;

import './assets/css/style.css';
import './assets/css/responsive.css';

import TopControls from './sections/TopControls';
import Results from './sections/Results';
import Loader from './ui/Loader';
import Error from './ui/Error';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';
import useAppLogic from './hooks/useAppLogic';

function App() {
  const { gifs, error, loading, query, setQuery, formSubmit } = useAppLogic();

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

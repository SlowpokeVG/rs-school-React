import { useRouter } from 'next/router';
import ResultItem from '../components/ResultItem';
import ResultItemSelect from './ResultItemSelect';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ResultDetails from '../components/ResultDetails';

function ResultItems() {
  const router = useRouter();
  const details = router.query.details || '';
  const gifs = useSelector((state: RootState) => state.pageData.currentData);

  const showDetails = (id: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, details: id },
    });
  };

  return (
    <div className="results-block">
      {gifs.length === 0 ? (
        <div className="resultsNotFound">Nothing found</div>
      ) : (
        <>
          <div className="results-items show-items">
            {gifs.map((gif) => (
              <div key={gif.id} className="results-items-wrapper">
                <ResultItemSelect gif={gif} />
                <div
                  className="results-items-inner"
                  onClick={() => showDetails(gif.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <ResultItem gif={gif} />
                </div>
              </div>
            ))}
          </div>
          {details && <ResultDetails />}
        </>
      )}
    </div>
  );
}

export default ResultItems;

import { Outlet, useSearchParams } from 'react-router-dom';
import ResultItem from '../components/ResultItem';
import ResultItemSelect from './ResultItemSelect';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function ResultItems() {
  const [searchParams, setSearchParams] = useSearchParams();
  const details = searchParams.get('details') || '';
  const gifs = useSelector((state: RootState) => state.pageData.currentData);

  const showDetails = (id: string) => {
    searchParams.set('details', id);
    setSearchParams(searchParams);
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
          {details && <Outlet />}
        </>
      )}
    </div>
  );
}

export default ResultItems;

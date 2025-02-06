import { Outlet, useSearchParams } from 'react-router-dom';
import ResultItem from '../components/ResultItem';
import { ResultItemsProps } from '../types';

function ResultItems({ gifs }: ResultItemsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const details = searchParams.get('details') || '';

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
              <div
                key={gif.id}
                onClick={() => showDetails(gif.id)}
                style={{ cursor: 'pointer' }}
              >
                <ResultItem gif={gif} />
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

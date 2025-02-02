import { useSearchParams } from 'react-router-dom';
import ResultItem from '../components/ResultItem';
import { ResultItemsProps } from '../types';
import ResultDetails from './ResultDetails';

function ResultItems({ gifs, details }: ResultItemsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const showDetails = (id: string) => {
    searchParams.set('details', id);
    setSearchParams(searchParams);
  };

  return (
    <div className="results-block">
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
      {details && <ResultDetails id={details} />}
    </div>
  );
}

export default ResultItems;

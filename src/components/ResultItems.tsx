import { Link, Outlet } from 'react-router-dom';
import ResultItem from '../components/ResultItem';
import { ResultItemsProps } from '../types';

function ResultItems({ gifs }: ResultItemsProps) {
  return (
    <div className="results-block">
      <div className="results-items show-items">
        {gifs.map((gif) => (
          <Link key={gif.id} to={`details/${gif.id}`}>
            <ResultItem key={gif.id} gif={gif} />
          </Link>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default ResultItems;

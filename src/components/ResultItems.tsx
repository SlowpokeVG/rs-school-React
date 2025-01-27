import ResultItem from '../components/ResultItem';
import { ResultItemsProps } from '../types';
import ResultDetails from './ResultDetails';

function ResultItems({ gifs }: ResultItemsProps) {
  return (
    <div className="results-block">
      <div className="results-items show-items">
        {gifs.map((gif) => (
          <ResultItem key={gif.id} gif={gif} />
        ))}
      </div>
      <ResultDetails />
    </div>
  );
}

export default ResultItems;

import ResultItem from '../components/ResultItem';
import { ResultItemsProps } from '../types';

function ResultItems({ gifs }: ResultItemsProps) {
  return (
    <div className="results-items show-items">
      {gifs.map((gif) => (
        <ResultItem key={gif.id} gif={gif} />
      ))}
    </div>
  );
}

export default ResultItems;

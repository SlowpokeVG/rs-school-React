import ResultItems from '../components/ResultItems';
import { ResultItemsProps } from '../types';

function Results({ gifs }: ResultItemsProps) {
  return (
    <section className="results">
      <ResultItems gifs={gifs} />
    </section>
  );
}

export default Results;

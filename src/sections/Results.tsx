import ResultItems from '../components/ResultItems';
import { ResultItemsProps } from '../types';
import ResultsNotFound from '../components/ResultsNotFound';

function Results({ gifs, details }: ResultItemsProps) {
  return (
    <section className="results">
      {gifs.length === 0 ? (
        <ResultsNotFound />
      ) : (
        <ResultItems gifs={gifs} details={details} />
      )}
    </section>
  );
}

export default Results;

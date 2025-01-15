import ResultItems from '../components/ResultItems';
//import Error from '../components/Error';
import ErrorButton from '../components/ErrorButton';

import { ResultItemsProps } from '../types';

function Results({ gifs }: ResultItemsProps) {
  return (
    <section className="results">
      <ResultItems gifs={gifs} />
      <ErrorButton />
    </section>
  );
}

export default Results;

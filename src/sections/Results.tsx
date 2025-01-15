//import { useState } from 'react';
import ResultItem from '../components/ResultItem.tsx';
//import Error from '../components/Error.tsx';
import ErrorButton from '../components/ErrorButton.tsx';

function Results() {
  return (
    <section className="results">
      <div className="results-items show-items">
        <ResultItem />
        <ResultItem />
        <ResultItem />
        <ResultItem />
        <ResultItem />
        <ResultItem />
        <ResultItem />
        <ResultItem />
      </div>

      <ErrorButton />
    </section>
  );
}

export default Results;

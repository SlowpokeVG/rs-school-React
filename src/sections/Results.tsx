//import { useState } from 'react';
import ResultTitles from '../components/ResultTitles.tsx';
import ResultItem from '../components/ResultItem.tsx';
//import Error from '../components/Error.tsx';
import ErrorButton from '../components/ErrorButton.tsx';

function Results() {
  return (
    <>
      <ResultTitles />

      <ResultItem />
      <ResultItem />
      <ResultItem />

      <ErrorButton />
    </>
  );
}

export default Results;

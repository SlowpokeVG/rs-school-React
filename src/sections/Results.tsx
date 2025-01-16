import { Component } from 'react';
import ResultItems from '../components/ResultItems';
import { ResultItemsProps } from '../types';
import ResultsNotFound from '../components/ResultsNotFound';

class Results extends Component<ResultItemsProps> {
  render() {
    const { gifs } = this.props;

    return (
      <section className="results">
        {gifs.length === 0 ? <ResultsNotFound /> : <ResultItems gifs={gifs} />}
      </section>
    );
  }
}

export default Results;

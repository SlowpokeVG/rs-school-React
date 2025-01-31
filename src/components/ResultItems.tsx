import { Component } from 'react';
import ResultItem from '../components/ResultItem';
import { ResultItemsProps } from '../types';

class ResultItems extends Component<ResultItemsProps> {
  render() {
    const { gifs } = this.props;

    return (
      <div className="results-items show-items">
        {gifs.map((gif) => (
          <ResultItem key={gif.id} gif={gif} />
        ))}
      </div>
    );
  }
}

export default ResultItems;

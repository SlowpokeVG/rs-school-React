import ResultItem from '../components/ResultItem';
import { ResultItemsProps } from '../types';

function ResultItems({ gifs }: ResultItemsProps) {
  return (
    <div className="results-block">
      <div className="results-items show-items">
        {gifs.map((gif) => (
          <ResultItem key={gif.id} gif={gif} />
        ))}
      </div>
      <div className="result-detail">
        <div className="close-detail"></div>
        <div className="result-title">Irish coffee</div>
        <div className="result-description">
          Fragrant black coffee with Jameson Irish whiskey and whipped milk
        </div>
        <div className="result-type">type: gif</div>

        <div className="author-title">Author:</div>
        <div className="author-profile">
          <div className="author-image">
            <img src="img/menu/coffee/coffee-1.jpg" alt="" />
          </div>
          <div className="author-name">Evan Hillton</div>
        </div>
        <div className="author-description">
          Fragrant black coffee with Jameson Irish whiskey and whipped milk
        </div>
      </div>
    </div>
  );
}

export default ResultItems;

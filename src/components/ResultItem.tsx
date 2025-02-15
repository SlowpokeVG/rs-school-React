import { ResultItemProps } from '../types';
import ResultItemSelect from './ResultItemSelect';

function ResultItem({ gif }: ResultItemProps) {
  return (
    <>
      <ResultItemSelect id={gif.id} />
      <div className="results-item">
        <div className="item-image">
          <img src={gif.images.fixed_height.url} alt={`Image ${gif.title}`} />
        </div>
        <div className="item-info">
          <div className="item-wrapper">
            <div className="item-title">{gif.title}</div>
            {gif.user && (
              <div className="item-description">
                Author: {gif.user.display_name}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultItem;

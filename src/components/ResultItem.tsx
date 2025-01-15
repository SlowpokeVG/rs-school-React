import { ResultItemProps } from "../types";

function ResultItem({ gif }: ResultItemProps) {
  return (
    <div className="results-item">
      <div className="item-image">
        <img src={gif.images.fixed_height.url} alt="" />
      </div>
      <div className="item-info">
        <div className="item-wrapper">
          <div className="item-title">{gif.title}</div>
          <div className="item-description">
            {gif.alt_text}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultItem;

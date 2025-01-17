import { Component } from 'react';
import { ResultItemProps } from '../types';

class ResultItem extends Component<ResultItemProps> {
  render() {
    const { gif } = this.props;

    return (
      <div className="results-item">
        <div className="item-image">
          <img src={gif.images.fixed_height.url} alt="" />
        </div>
        <div className="item-info">
          <div className="item-wrapper">
            <div className="item-title">{gif.title}</div>
            {gif.user ? (
              <div className="item-description">
                Author: {gif.user.display_name}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ResultItem;

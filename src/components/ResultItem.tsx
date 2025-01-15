//import { useState } from 'react';

function ResultItem() {
  return (
    <div className="results-item">
      <div className="item-image">
        <img src="/img/coffee-1.jpg" alt="" />
      </div>
      <div className="item-info">
        <div className="item-wrapper">
          <div className="item-title">Irish coffee</div>
          <div className="item-description">
            Fragrant black coffee with Jameson Irish whiskey and whipped milk
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultItem;

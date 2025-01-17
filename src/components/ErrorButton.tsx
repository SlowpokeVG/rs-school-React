import { useState } from 'react';

function ErrorButton() {
  const [errorState, setErrorState] = useState(false);

  function handleClick() {
    setErrorState(true);
  }

  if (errorState) {
    throw new Error('Fake Error');
  }

  return (
    <div className="error-section">
      <div className="error">
        <div className="error-button" onClick={handleClick}>
          <div className="error-button-text">Show Error</div>
        </div>
      </div>
    </div>
  );
}

export default ErrorButton;

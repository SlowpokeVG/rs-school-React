import { useState } from 'react';

function ErrorButton() {
  const [errorState, setErrorState] = useState(false);

  if (errorState) {
    throw new Error('Fake Error');
  }

  function handleClick() {
    setErrorState(true);
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

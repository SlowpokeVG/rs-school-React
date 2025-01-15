//import { useState } from 'react';

import { useState } from 'react';

function ErrorButton() {
  const [errorState, setErrorState] = useState(false);
  if (errorState) throw new Error('Fake Error');

  return (
    <section className="error-section">
      <div className="error">
        <div className="error-button">
          <div
            className="error-button-text"
            onClick={() => {
              setErrorState(true);
            }}
          >
            Show Error
          </div>
        </div>
      </div>
    </section>
  );
}

export default ErrorButton;

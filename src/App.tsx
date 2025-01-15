//import { useState } from 'react';
import './assets/css/style.css';
import './assets/css/responsive.css';

import TopControls from './sections/TopControls.tsx';
import Results from './sections/Results.tsx';

function App() {
  return (
    <>
      <main>
        <TopControls />
        <Results />
      </main>
    </>
  );
}

export default App;

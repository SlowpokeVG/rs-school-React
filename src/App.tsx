import './assets/css/style.css';
import './assets/css/task2.css';
import './assets/css/responsive.css';
import SearchScreen from './screens/Search';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ResultDetails from './components/ResultDetails';
import ErrorBoundary from './components/ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/:page?',
    element: <SearchScreen />,
    children: [
      {
        path: 'details/:id',
        element: <ResultDetails />,
      },
    ],
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;

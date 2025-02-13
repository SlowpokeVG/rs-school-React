import './assets/css/style.css';
import './assets/css/task2.css';
import './assets/css/responsive.css';
import SearchScreen from './screens/Search';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundScreen from './screens/NotFound';
import ResultDetails from './components/ResultDetails';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchScreen />,
    children: [
      {
        path: '',
        element: <ResultDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundScreen />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;

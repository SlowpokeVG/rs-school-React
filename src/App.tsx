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
import { ThemeContext } from './context/themeContext';

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
      <ThemeContext.Provider value={{}}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;

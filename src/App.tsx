import './assets/css/style.css';
import './assets/css/task2.css';
import './assets/css/task3.css';
import './assets/css/responsive.css';
import SearchScreen from './screens/Search';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundScreen from './screens/NotFound';
import ResultDetails from './components/ResultDetails';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/themeProvider';

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
      <ThemeProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default App;

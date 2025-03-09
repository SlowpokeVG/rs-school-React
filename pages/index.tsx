import SearchScreen from '../screens/SearchScreen';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import NotFoundScreen from '../screens/NotFound';
import ResultDetails from '../components/ResultDetails';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/themeProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <SearchScreen />
      </ErrorBoundary>
    ),
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

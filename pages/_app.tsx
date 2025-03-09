import '../styles/style.css';
import '../styles/task2.css';
import '../styles/task3.css';
import '../styles/responsive.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ThemeProvider } from '@/context/themeProvider';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

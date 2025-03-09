import { act, render, screen, waitFor } from '@testing-library/react';
import SearchScreen from '../screens/SearchScreen';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { setCurrentData } from '../redux/slices/currentPageSlice';
import { mockGifs } from '../__mocks__/mockData';
import '@testing-library/jest-dom';
import { useSearchGifsQuery } from '../redux/api';
import { useRouter } from 'next/router';

jest.mock('../redux/api', () => ({
  ...jest.requireActual('../redux/api'),
  useSearchGifsQuery: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt } = props;
    return <img src={src} width ='0px' alt={alt || 'mocked image'} />;
  },
}));

describe('SearchScreen component', () => {
  beforeEach(() => {
    store.dispatch(setCurrentData([]));
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: jest.fn(),
    });
  });

  it('renders without crashing', async () => {
    (useSearchGifsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <SearchScreen />
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  it('displays a loader initially', async () => {
    (useSearchGifsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <SearchScreen />
        </Provider>
      );
    });

    await waitFor(() => {
      expect(document.querySelector('.loader')).toBeInTheDocument();
    });
  });

  it('displays results when API call is successful', async () => {
    (useSearchGifsQuery as jest.Mock).mockReturnValue({
      data: {
        data: mockGifs,
        pagination: {
          total_count: 100,
          count: 0,
          offset: 0,
        },
      },
      error: undefined,
      isLoading: false,
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <SearchScreen />
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Im Ready Lets Go GIF by Leroy Patterson')).toBeInTheDocument();
    });
  });

  it('displays an error message when API call fails', async () => {
    (useSearchGifsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: { status: 'Fake Error' },
      isLoading: false,
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <SearchScreen />
        </Provider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Error: Fake Error')).toBeInTheDocument();
    });
  });

  it('renders pagination controls', async () => {
    (useSearchGifsQuery as jest.Mock).mockReturnValue({
      data: {
        data: mockGifs,
        pagination: {
          total_count: 100,
          count: 0,
          offset: 0,
        },
      },
      error: undefined,
      isLoading: false,
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <SearchScreen />
        </Provider>
      );
    });

    await waitFor(() => {
      expect(document.querySelector('.navigation')).toBeInTheDocument();
    });
  });

  it('renders the error button', async () => {
    (useSearchGifsQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    await act(async () => {
      render(
        <Provider store={store}>
          <SearchScreen />
        </Provider>
      );
    });

    await waitFor(() => {
      expect(document.querySelector('.error-button')).toBeInTheDocument();
    });
  });
});

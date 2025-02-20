import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchScreen from '../screens/SearchScreen';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { mockGifs } from './mockData';
import '@testing-library/jest-dom';
import { useSearchGifsQuery } from '../redux/api';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { setCurrentData } from '../redux/slices/currentPageSlice';

vi.mock(import('../redux/api'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useSearchGifsQuery: vi.fn(),
  };
});

describe('SearchScreen component', () => {
  beforeEach(() => {
    store.dispatch(setCurrentData([]));
  });

  it('renders without crashing', async () => {
    (useSearchGifsQuery as Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <SearchScreen />
          </Provider>
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  it('displays a loader initially', async () => {
    (useSearchGifsQuery as Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <SearchScreen />
          </Provider>
        </MemoryRouter>
      );
    });
    await waitFor(() => {
      expect(document.querySelector('.loader')).toBeInTheDocument();
    });
  });

  it('displays results when API call is successful', async () => {
    (useSearchGifsQuery as Mock).mockReturnValue({
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
        <MemoryRouter>
          <Provider store={store}>
            <SearchScreen />
          </Provider>
        </MemoryRouter>
      );
    });

    await waitFor(() =>
      expect(
        screen.getByText('Im Ready Lets Go GIF by Leroy Patterson')
      ).toBeInTheDocument()
    );
  });

  it('displays an error message when API call fails', async () => {
    (useSearchGifsQuery as Mock).mockReturnValue({
      data: undefined,
      error: { status: 'Fake Error' },
      isLoading: false,
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <SearchScreen />
          </Provider>
        </MemoryRouter>
      );
    });

    await waitFor(() =>
      expect(screen.getByText('Error: Fake Error')).toBeInTheDocument()
    );
  });

  it('renders pagination controls', async () => {
    (useSearchGifsQuery as Mock).mockReturnValue({
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
        <MemoryRouter>
          <Provider store={store}>
            <SearchScreen />
          </Provider>
        </MemoryRouter>
      );
    });
    await waitFor(() =>
      expect(document.querySelector('.navigation')).toBeInTheDocument()
    );
  });

  it('renders the error button', async () => {
    (useSearchGifsQuery as Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <Provider store={store}>
            <SearchScreen />
          </Provider>
        </MemoryRouter>
      );
    });
    await waitFor(() =>
      expect(document.querySelector('.error-button')).toBeInTheDocument()
    );
  });
});

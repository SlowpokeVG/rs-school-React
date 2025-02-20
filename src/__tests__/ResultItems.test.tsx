import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import ResultItems from '../components/ResultItems';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mockGifs } from './mockData';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { setCurrentData } from '../redux/slices/currentPageSlice';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

  let params = new URLSearchParams('?page=1');

  const setSearchParams = (
    newParams:
      | string
      | string[][]
      | Record<string, string>
      | URLSearchParams
      | undefined
  ) => {
    params = new URLSearchParams(newParams);
  };

  return {
    ...actual,
    useSearchParams: vi.fn(() => [params, setSearchParams]),
  };
});

describe('ResultItems Component', () => {
  beforeEach(() => {
    store.dispatch(setCurrentData([]));
  });

  it('renders the correct number of cards', () => {
    store.dispatch(setCurrentData(mockGifs));
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ResultItems />
        </Provider>
      </MemoryRouter>
    );

    const items = document.querySelectorAll('.results-item');
    expect(items.length).toBe(mockGifs.length);
  });

  it('shows a message if no cards are present', () => {
    store.dispatch(setCurrentData([]));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <ResultItems />
        </Provider>
      </MemoryRouter>
    );

    const message = document.querySelector('.resultsNotFound');
    expect(message).not.toBeNull();
  });

  it('should update searchParams when gif is clicked', async () => {
    store.dispatch(setCurrentData(mockGifs));
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ResultItems />
        </Provider>
      </MemoryRouter>
    );

    const button = screen.getByText('Im Ready Lets Go GIF by Leroy Patterson');
    if (button) {
      fireEvent.click(button);
    }

    await waitFor(() => {
      const [params] = useSearchParams();
      expect(params.get('details')).toBe('CjmvTCZf2U3p09Cn0h');
    });
  });
});

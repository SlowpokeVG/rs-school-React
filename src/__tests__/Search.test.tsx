import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Search from '../components/Search';
import { beforeEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves the entered value to local storage on search', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);

    expect(localStorage.getItem('query')).toBe('test query');
  });

  it('retrieves the value from local storage upon mounting', () => {
    localStorage.setItem('query', 'saved query');
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Search')).toHaveValue('saved query');
  });

  it('saves query in redux store', () => {
    localStorage.setItem('query', 'saved query');
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Search');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);

    expect(store.getState().search.query).toBe('test query');
  });
});

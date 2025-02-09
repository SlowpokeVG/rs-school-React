import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Search from '../components/Search';
import { beforeEach, describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves the entered value to local storage on search', () => {
    render(
      <MemoryRouter>
        <Search fetchGifs={function (): void {}} />
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
        <Search fetchGifs={function (): void {}} />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Search')).toHaveValue('saved query');
  });
});

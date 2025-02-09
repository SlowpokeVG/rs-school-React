import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import ResultItems from '../components/ResultItems';
import { Gif, ResultItemsProps } from '../types';
import { describe, it, expect, vi } from 'vitest';
import { mockGifs } from './mockData';
import '@testing-library/jest-dom';

const renderWithRouter = (props: ResultItemsProps) => {
  return render(
    <MemoryRouter>
      <ResultItems {...props} />
    </MemoryRouter>
  );
};

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
  it('renders the correct number of cards', () => {
    renderWithRouter({ gifs: mockGifs as unknown as Gif[] });

    const items = document.querySelectorAll('.results-item');
    expect(items.length).toBe(mockGifs.length);
  });

  it('shows a message if no cards are present', () => {
    renderWithRouter({ gifs: [] });

    const message = document.querySelector('.resultsNotFound');
    expect(message).not.toBeNull();
  });

  it('should update searchParams when gif is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ResultItems gifs={mockGifs} />
      </MemoryRouter>
    );

    const closeButton = screen.getByText(
      'Im Ready Lets Go GIF by Leroy Patterson'
    );
    if (closeButton) {
      fireEvent.click(closeButton);
    }

    await waitFor(() => {
      const [params] = useSearchParams();
      expect(params.get('details')).toBe('CjmvTCZf2U3p09Cn0h');
    });
  });
});

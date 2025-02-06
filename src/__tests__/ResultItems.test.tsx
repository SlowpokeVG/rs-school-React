import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ResultItems from '../components/ResultItems';
import { Gif, ResultItemsProps } from '../types';
import { describe, it, expect } from 'vitest';
import { mockGifs } from './mockData';

const renderWithRouter = (props: ResultItemsProps) => {
  return render(
    <MemoryRouter>
      <ResultItems {...props} />
    </MemoryRouter>
  );
};

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
});

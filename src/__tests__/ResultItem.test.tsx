import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResultItem from '../components/ResultItem';
import { mockGifs } from './mockData';

describe('ResultItem Component', () => {
  it('renders relevant card data', () => {
    render(<ResultItem gif={mockGifs[0]} />);

    expect(
      screen.getByText('Im Ready Lets Go GIF by Leroy Patterson')
    ).toBeInTheDocument();

    const img = screen.getByAltText(
      'Image Im Ready Lets Go GIF by Leroy Patterson'
    );
    expect(img).toHaveAttribute('src', mockGifs[0].images.fixed_height.url);

    expect(screen.getByText('Author: Leroy Patterson')).toBeInTheDocument();
  });
});

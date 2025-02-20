import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Title from '../components/Title';

describe('Title', () => {
  it('renders the title correctly', () => {
    render(<Title />);
    expect(screen.getByText('Giphy API')).toBeInTheDocument();
  });
});

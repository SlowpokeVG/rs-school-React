import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Title from '../components/Title';

describe('Title', () => {
  it('renders the title correctly', () => {
    render(<Title />);
    expect(screen.getByText('Giphy API')).toBeInTheDocument();
  });
});
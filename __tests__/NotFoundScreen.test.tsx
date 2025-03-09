import { render, screen } from '@testing-library/react';
import NotFoundScreen from '../screens/NotFound';
import '@testing-library/jest-dom';

describe('NotFoundScreen component', () => {
  it('renders 404 message', () => {
    render(<NotFoundScreen />);
    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
  });

  it('renders link to return to main page', () => {
    render(<NotFoundScreen />);
    const link = screen.getByRole('link', { name: /return to main page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
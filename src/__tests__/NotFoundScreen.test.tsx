import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFoundScreen from '../screens/NotFound';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('NotFoundScreen component', () => {
  it('renders 404 message', () => {
    render(
      <MemoryRouter>
        <NotFoundScreen />
      </MemoryRouter>
    );

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
  });

  it('renders link to return to main page', () => {
    render(
      <MemoryRouter>
        <NotFoundScreen />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /return to main page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});

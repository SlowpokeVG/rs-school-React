import '@testing-library/jest-dom';
import { vi, describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from '../components/ErrorButton';
import ErrorBoundary from '../components/ErrorBoundary';

describe('ErrorButton', () => {
  it('renders button correctly', () => {
    render(<ErrorButton />);
    expect(screen.getByText('Show Error')).toBeInTheDocument();
  });

  it('throws an error when clicked', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByText('Show Error');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});

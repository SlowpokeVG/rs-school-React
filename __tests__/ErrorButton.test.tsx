import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from '../components/ErrorButton';
import ErrorBoundary from '../components/ErrorBoundary';

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('ErrorButton', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders button correctly', () => {
    render(<ErrorButton />);
    expect(screen.getByText('Show Error')).toBeInTheDocument();
  });

  it('throws an error when clicked', () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    const button = screen.getByText('Show Error');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
  });
});

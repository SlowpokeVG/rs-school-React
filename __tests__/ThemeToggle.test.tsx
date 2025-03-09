import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/ThemeToggle';
import { ThemeProvider } from '../context/themeProvider';
import '@testing-library/jest-dom';

describe('ThemeToggle', () => {
  it('toggles theme', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('dark'));

    expect(screen.getByText('light')).toBeInTheDocument();
  });
});

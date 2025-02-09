import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Pagination from '../components/Pagination';

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

describe('Pagination component', () => {
  it('updates URL query parameter when page changes', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Pagination pagesCount={5} />} />
        </Routes>
      </MemoryRouter>
    );

    let [params] = useSearchParams();
    expect(params.get('page')).toBe('1');

    const secondPageButton = screen.getByText('2');
    fireEvent.click(secondPageButton);

    await waitFor(() => {
      [params] = useSearchParams();
      expect(params.get('page')).toBe('2');
    });

    const thirdPageButton = screen.getByText('3');
    fireEvent.click(thirdPageButton);

    await waitFor(() => {
      [params] = useSearchParams();
      expect(params.get('page')).toBe('3');
    });
  });
});

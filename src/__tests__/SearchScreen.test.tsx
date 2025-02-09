import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchScreen from '../screens/Search';
import * as api from '../scripts/api';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mockGifs } from './mockData';
import '@testing-library/jest-dom';

vi.mock('../scripts/api');

describe('SearchScreen component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <SearchScreen />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });

  it('displays a loader initially', async () => {
    vi.spyOn(api, 'trending').mockImplementation(() => new Promise(() => {}));

    await act(async () => {
      render(
        <MemoryRouter>
          <SearchScreen />
        </MemoryRouter>
      );
    });
    await waitFor(() => {
      expect(document.querySelector('.loader')).toBeInTheDocument();
    });
  });

  it('displays results when API call is successful', async () => {
    vi.spyOn(api, 'trending').mockResolvedValue({
      success: true,
      data: {
        data: mockGifs,
        pagination: {
          total_count: 100,
          count: 0,
          offset: 0,
        },
        meta: {
          status: 0,
          msg: '',
          response_id: '',
        },
      },
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <SearchScreen />
        </MemoryRouter>
      );
    });

    await waitFor(() =>
      expect(
        screen.getByText('Im Ready Lets Go GIF by Leroy Patterson')
      ).toBeInTheDocument()
    );
  });

  it('displays an error message when API call fails', async () => {
    vi.spyOn(api, 'trending').mockResolvedValue({
      success: false,
      error: 'API Error',
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <SearchScreen />
        </MemoryRouter>
      );
    });

    await waitFor(() =>
      expect(screen.getByText('API Error')).toBeInTheDocument()
    );
  });

  it('renders pagination controls', async () => {
    vi.spyOn(api, 'trending').mockResolvedValue({
      success: true,
      data: {
        data: [],
        pagination: {
          total_count: 100,
          count: 0,
          offset: 0,
        },
        meta: {
          status: 0,
          msg: '',
          response_id: '',
        },
      },
    });
    await act(async () => {
      render(
        <MemoryRouter>
          <SearchScreen />
        </MemoryRouter>
      );
    });
    await waitFor(() =>
      expect(document.querySelector('.navigation')).toBeInTheDocument()
    );
  });

  it('renders the error button', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <SearchScreen />
        </MemoryRouter>
      );
    });
    await waitFor(() =>
      expect(document.querySelector('.error-button')).toBeInTheDocument()
    );
  });
});

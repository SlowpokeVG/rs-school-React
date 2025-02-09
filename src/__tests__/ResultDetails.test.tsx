import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { Routes, Route, MemoryRouter } from 'react-router-dom';
import ResultDetails from '../components/ResultDetails';
import * as api from '../scripts/api';
import { mockGifs } from './mockData';
import '@testing-library/jest-dom';

vi.mock('../scripts/api');
const mockGif = mockGifs[0];

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: vi.fn(() => {
      const params = new URLSearchParams('?details=CjmvTCZf2U3p09Cn0h');
      return [
        params,
        vi.fn(() => {
          params.delete('details');
        }),
      ];
    }),
  };
});

describe('ResultDetails Component', () => {
  it('should display a loading indicator while fetching data', async () => {
    vi.spyOn(api, 'detail').mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<ResultDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByAltText('Spinner')).toBeInTheDocument();
  });

  it('should correctly display detailed card data when fetched', async () => {
    vi.spyOn(api, 'detail').mockResolvedValueOnce({
      success: true,
      data: {
        data: mockGif,
        meta: {
          status: 0,
          msg: '',
          response_id: '',
        },
      },
    });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<ResultDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(mockGif.title)).toBeInTheDocument();
      expect(screen.getByText(`Type: ${mockGif.type}`)).toBeInTheDocument();
      expect(
        screen.getByText(`Uploaded on: ${mockGif.import_datetime}`)
      ).toBeInTheDocument();
      expect(screen.getByText('Source')).toBeInTheDocument();
    });
  });
  it('no Gif error', async () => {
    vi.spyOn(api, 'detail').mockResolvedValueOnce({
      success: false,
    });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<ResultDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText('Error: Failed to load GIFs.')
      ).toBeInTheDocument();
    });
  });
  it('should close the component when the close button is clicked', async () => {
    const mockGif = mockGifs[0];

    vi.spyOn(api, 'detail').mockResolvedValueOnce({
      success: true,
      data: {
        data: mockGif,
        meta: {
          status: 0,
          msg: '',
          response_id: '',
        },
      },
    });

    render(
      <MemoryRouter initialEntries={['/?details=CjmvTCZf2U3p09Cn0h']}>
        <Routes>
          <Route path="/" element={<ResultDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await screen.findByText('Source');
    const closeButton = document.querySelector('.close-detail');
    if (closeButton) {
      fireEvent.click(closeButton);
    }

    await waitFor(() => {
      expect(screen.queryByText('Source')).toBeNull();
    });
  });
});

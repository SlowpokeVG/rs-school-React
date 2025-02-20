import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, Mock } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ResultDetails from '../components/ResultDetails';
import { mockGifs } from './mockData';
import '@testing-library/jest-dom';
import { useDetailQuery } from '../redux/api';

vi.mock('../redux/api', () => ({
  useDetailQuery: vi.fn(),
}));
const mockGif = mockGifs[0];

describe('ResultDetails Component', () => {
  it('should display a loading indicator while fetching data', async () => {
    (useDetailQuery as Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });

    render(
      <MemoryRouter initialEntries={['/?details=CjmvTCZf2U3p09Cn0h']}>
        <ResultDetails />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Spinner')).toBeInTheDocument();
  });

  it('should correctly display detailed card data when fetched', async () => {
    (useDetailQuery as Mock).mockReturnValue({
      data: { data: mockGif },
      error: undefined,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/?details=CjmvTCZf2U3p09Cn0h']}>
        <ResultDetails />
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
    (useDetailQuery as Mock).mockReturnValue({
      data: undefined,
      error: { status: 'Fake Error' },
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/?details=CjmvTCZf2U3p09Cn0h']}>
        <ResultDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Fake Error')).toBeInTheDocument();
    });
  });
  it('should close the component when the close button is clicked', async () => {
    (useDetailQuery as Mock).mockReturnValue({
      data: { data: mockGif },
      error: undefined,
      isLoading: false,
    });

    render(
      <MemoryRouter initialEntries={['/?details=CjmvTCZf2U3p09Cn0h']}>
        <ResultDetails />
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

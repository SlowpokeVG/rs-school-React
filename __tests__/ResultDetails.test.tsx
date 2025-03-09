import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ResultDetails from '../components/ResultDetails';
import { mockGifs } from '../__mocks__/mockData';
import '@testing-library/jest-dom';
import { useDetailQuery } from '../redux/api';
import { useRouter } from 'next/router';

jest.mock('../redux/api', () => ({
  useDetailQuery: jest.fn(),
}));

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt } = props;
    return <img src={src} alt={alt || 'mocked image'} />;
  },
}));

const mockGif = mockGifs[0];

describe('ResultDetails Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { details: 'CjmvTCZf2U3p09Cn0h' },
      push: jest.fn(),
    });
  });
  it('should display a loading indicator while fetching data', async () => {
    (useDetailQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: true,
    });
    
    render(<ResultDetails />);
    expect(screen.getByAltText('Spinner')).toBeInTheDocument();
  });

  it('should correctly display detailed card data when fetched', async () => {
    (useDetailQuery as jest.Mock).mockReturnValue({
      data: { data: mockGif },
      error: undefined,
      isLoading: false,
    });

    render(<ResultDetails />);

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
    (useDetailQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: { status: 'Fake Error' },
      isLoading: false,
    });

    render(<ResultDetails />);

    await waitFor(() => {
      expect(screen.getByText('Error: Fake Error')).toBeInTheDocument();
    });
  });

});

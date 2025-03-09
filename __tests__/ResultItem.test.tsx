import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ResultItem from '../components/ResultItem';
import { mockGifs } from '../__mocks__/mockData';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: any; alt: any; }) => {
    const { src, alt } = props;
    return <img src={src} alt={alt || 'mocked image'} />;
  },
}));

describe('ResultItem Component', () => {
  it('renders relevant card data', () => {
    render(<ResultItem gif={mockGifs[0]} />);

    expect(screen.getByText(mockGifs[0].title)).toBeInTheDocument();

    const img = screen.getByAltText(`Image ${mockGifs[0].title}`);
    expect(img).toHaveAttribute('src', mockGifs[0].images.fixed_height.url);

    if (mockGifs[0].user) {
      expect(
        screen.getByText(`Author: ${mockGifs[0].user.display_name}`)
      ).toBeInTheDocument();
    }
  });
});
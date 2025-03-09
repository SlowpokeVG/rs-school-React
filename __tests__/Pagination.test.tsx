import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import Pagination from '../components/Pagination';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Pagination component', () => {
  it('updates URL query parameter when page changes', async () => {
    let query = { page: '1' };
    
    (useRouter as jest.Mock).mockReturnValue({
      query,
      push: jest.fn(({ query: newQuery }) => {
        query.page = newQuery.page || '1';
      }),
    });

    render(<Pagination pagesCount={5} />);

    expect(query.page).toBe('1');

    const secondPageButton = screen.getByText('2');
    fireEvent.click(secondPageButton);

    await waitFor(() => {
      expect(query.page).toBe('2');
    });

    const thirdPageButton = screen.getByText('3');
    fireEvent.click(thirdPageButton);

    await waitFor(() => {
      expect(query.page).toBe('3');
    });
  });
});

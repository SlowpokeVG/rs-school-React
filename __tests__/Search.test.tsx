import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useRouter } from 'next/router';

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

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: jest.fn(),
    });
  });

  it('saves the entered value to local storage on search', () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);

    expect(localStorage.getItem('query')).toBe('test query');
  });

  it('retrieves the value from local storage upon mounting', () => {
    localStorage.setItem('query', 'saved query');
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Search')).toHaveValue('saved query');
  });

  it('saves query in redux store', () => {
    localStorage.setItem('query', 'saved query');
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'test query' } });
    fireEvent.click(button);

    expect(store.getState().search.query).toBe('test query');
  });
});

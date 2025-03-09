import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import ResultItems from '../components/ResultItems';
import { mockGifs } from '../__mocks__/mockData';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { setCurrentData } from '../redux/slices/currentPageSlice';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ResultItems Component', () => {
  beforeEach(() => {
    store.dispatch(setCurrentData([]));
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: jest.fn(),
    });
  });

  it('renders the correct number of cards', () => {
    store.dispatch(setCurrentData(mockGifs));
    render(
      <Provider store={store}>
        <ResultItems />
      </Provider>
    );

    const items = document.querySelectorAll('.results-item');
    expect(items.length).toBe(mockGifs.length);
  });

  it('shows a message if no cards are present', () => {
    store.dispatch(setCurrentData([]));
    render(
      <Provider store={store}>
        <ResultItems />
      </Provider>
    );

    const message = document.querySelector('.resultsNotFound');
    expect(message).not.toBeNull();
  });

 
});
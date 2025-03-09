import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import Flyout from '../components/Flyout';
import {
  clearSelection,
  toggleSelection,
} from '../redux/slices/selectedItemsSlice';
import { store } from '../redux/store';
import { mockGifs } from '../__mocks__/mockData';

jest.mock('../redux/store', () => ({
  ...jest.requireActual('../redux/store'),
}));

describe('Flyout component', () => {
  beforeEach(() => {
    store.dispatch(clearSelection());
  });

  it('renders when items are selected', () => {
    store.dispatch(toggleSelection(mockGifs[0]));
    store.dispatch(toggleSelection(mockGifs[1]));
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText('2 items are selected')).toBeInTheDocument();
  });

  it('does not render when no items are selected', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.queryByText('Download')).not.toBeInTheDocument();
  });

  it("clears store when 'Unselect All' button is clicked", () => {
    store.dispatch(toggleSelection(mockGifs[0]));
    store.dispatch(toggleSelection(mockGifs[1]));
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
    expect(screen.queryByText('Download')).toBeInTheDocument();

    const button = screen.getByText('Unselect All');
    fireEvent.click(button);

    expect(screen.queryByText('Download')).not.toBeInTheDocument();
  });
});

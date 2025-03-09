import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Gif } from '../../types';

interface SelectedItemsState {
  selected: string[];
  selectedGifs: Gif[];
}

const initialState: SelectedItemsState = {
  selected: [],
  selectedGifs: [],
};

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleSelection: (state, action: PayloadAction<Gif>) => {
      const gif = action.payload;
      const isSelected = state.selected.includes(gif.id);

      if (isSelected) {
        state.selected = state.selected.filter((id) => id !== gif.id);
        state.selectedGifs = state.selectedGifs.filter(
          (item) => item.id !== gif.id
        );
      } else {
        state.selected.push(gif.id);
        state.selectedGifs.push(gif);
      }
    },
    clearSelection: (state) => {
      state.selected = [];
      state.selectedGifs = [];
    },
  },
});

export const { toggleSelection, clearSelection } = selectedItemsSlice.actions;

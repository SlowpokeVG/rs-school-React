import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Gif } from '../../types';

interface PageState {
  currentData: Gif[];
}

const initialState: PageState = {
  currentData: [],
};

export const pageSlice = createSlice({
  name: 'pageData',
  initialState,
  reducers: {
    setCurrentData(state, action: PayloadAction<Gif[]>) {
      state.currentData = action.payload;
    },
  },
});

export const { setCurrentData } = pageSlice.actions;

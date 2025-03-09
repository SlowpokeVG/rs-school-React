import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  query: string | null;
}

const initialState: SearchState = {
  query: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
});

export const { setQuery } = searchSlice.actions;

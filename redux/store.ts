import { configureStore } from '@reduxjs/toolkit';
import { selectedItemsSlice } from './slices/selectedItemsSlice';
import { giphyApi } from './api';
import { searchSlice } from './slices/searchSlice';
import { pageSlice } from './slices/currentPageSlice';

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
    [giphyApi.reducerPath]: giphyApi.reducer,
    search: searchSlice.reducer,
    pageData: pageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(giphyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

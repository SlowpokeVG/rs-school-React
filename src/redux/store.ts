import { configureStore } from "@reduxjs/toolkit";
import selectedItemsReducer from "./reducers/selectedItemsReducer";

export const store = configureStore({
  reducer: {
    selectedItems: selectedItemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

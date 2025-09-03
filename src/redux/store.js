import { configureStore } from "@reduxjs/toolkit";
import reducer from "./rootReducer";
import baseApi from "./baseApi";

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});


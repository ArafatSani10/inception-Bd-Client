"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "../redux/store";
const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <ToastContainer />
      {children}
    </Provider>
  );
};

export default ReduxProvider;

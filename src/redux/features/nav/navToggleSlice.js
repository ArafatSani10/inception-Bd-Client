import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const navbarSlice = createSlice({
  name: "navToggle",
  initialState,
  reducers: {
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = navbarSlice.actions;

export default navbarSlice.reducer;

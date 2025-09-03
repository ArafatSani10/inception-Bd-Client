import baseApi from "./baseApi";
import navbarReducer from "./features/nav/navToggleSlice";

const reducer = {
  navToggle: navbarReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
export default reducer;

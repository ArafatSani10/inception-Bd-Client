import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypeList } from "./tagTypes";

const baseQuery = async (args, api, extraOptions) => {
  // works on client side
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API,
    credentials: "include", // ❗️This line is the fix
  });

  return rawBaseQuery(args, api, extraOptions);
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
export default baseApi;

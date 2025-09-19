import baseApi from "../baseApi";
import { tagTypes } from "../tagTypes";

const AUTH_URL = "/users";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyData: build.query({
      query: () => {
        const accessToken = localStorage.getItem("access_token"); // load token from localStorage
        return {
          url: `${AUTH_URL}/my-data`,
          method: "GET", // usually GET for fetching role
          headers: {
            Authorization: `Bearer ${accessToken}`, // send token in header
          },
        };
      },
      invalidatesTags: [tagTypes.USER],
    }),
    getInitialLandingPageData: build.query({
      query: () => ({
        url: `${AUTH_URL}/initial-data`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyDataQuery, useLazyGetMyDataQuery, useGetInitialLandingPageDataQuery } = userApi;

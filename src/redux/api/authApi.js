import baseApi from "../baseApi";
import { tagTypes } from "../tagTypes";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getRole: build.query({
      query: () => {
        const accessToken = localStorage.getItem("access_token"); // load token from localStorage

        return {
          url: `${AUTH_URL}/get-role`,
          method: "GET", // usually GET for fetching role
          headers: {
            Authorization: `Bearer ${accessToken}`, // send token in header
          },
        };
      },
      invalidatesTags: [tagTypes.AUTH],
    }),
  }),
});

export const { useGetRoleQuery } = authApi;

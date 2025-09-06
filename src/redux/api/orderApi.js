import baseApi from "../baseApi";
import { tagTypes } from "../tagTypes";

const URL = "/orders";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    myOrders: build.query({
      query: (email) => {
        return {
          url: `${URL}/${email}`,
          method: "GET", // usually GET for fetching role
        };
      },
      invalidatesTags: [tagTypes.ORDER],
    }),
  }),
});

export const { useMyOrdersQuery } = orderApi;

import baseApi from "../baseApi";
import { tagTypes } from "../tagTypes";

const AUTH_URL = "/reviews";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.REVIEW], // Refresh course data after review create
    }),
  }),
});

export const { useCreateReviewMutation } = reviewApi;

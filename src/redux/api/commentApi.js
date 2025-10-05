import baseApi from "../baseApi";
import { tagTypes } from "../tagTypes";

const AUTH_URL = "/comments";

export const commentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.COMMENT], // Refresh course data after comment create
    }),
  }),
});

export const { useCreateCommentMutation } = commentApi;

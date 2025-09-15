import baseApi from "../baseApi";
import { tagTypes } from "../tagTypes";

const AUTH_URL = "/courses";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCourse: build.query({
      query: () => {
        return {
          url: `${AUTH_URL}`,
          method: "GET", // usually GET for fetching role
        };
      },
      providesTags: [tagTypes.COURSE],
    }),
    getSingleCourse: build.query({
      query: (id) => {
        return {
          url: `${AUTH_URL}/${id}`,
          method: "GET", // usually GET for fetching role
        };
      },
      providesTags: [tagTypes.COURSE],
    }),

    updateOne: build.mutation({
      query: ({ id, ...data }) => ({
        url: `${AUTH_URL}/update/${id}`,
        method: "PATCH",
        body: data, // ✅ সরাসরি পাঠানো হচ্ছে
      }),
      invalidatesTags: [tagTypes.COURSE], // ✅ mutation এ invalidatesTags হবে
    }),

    deleteOne: build.mutation({
      query: (id) => {
        return {
          url: `${AUTH_URL}/delete/${id}`,
          method: "DELETE", // usually GET for fetching role
        };
      },
      invalidatesTags: [tagTypes.COURSE],
    }),
  }),
});

export const {
  useGetAllCourseQuery,
  useGetSingleCourseQuery,
  useUpdateOneMutation,
  useDeleteOneMutation,
} = courseApi;

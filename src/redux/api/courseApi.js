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
      invalidatesTags: [tagTypes.COURSE],
    }),
  }),
});

export const { useGetAllCourseQuery } = courseApi;

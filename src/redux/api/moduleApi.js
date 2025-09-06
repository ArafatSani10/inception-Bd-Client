import baseApi from "../baseApi";
import { tagTypes } from "../tagTypes";

const URL = "/modules";

export const moduleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createModule: build.mutation({
      query: (data) => {
        return {
          url: `${URL}/create`,
          method: "POST", // usually GET for fetching role
          body:data
        };
      },
      providesTags: [tagTypes.MODULE],
    }),
  }),
});

export const { useCreateModuleMutation } = moduleApi;

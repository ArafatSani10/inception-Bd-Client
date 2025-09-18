// categoryApi.js (RTK Query)

import baseApi from "../baseApi";
import { tagTypes } from "../tagTypes";


const CATEGORY_URL = "/categories";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get all categories
    getAllCategories: build.query({
      query: () => {
        return {
          url: `${CATEGORY_URL}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.CATEGORY],
    }),

    // Get single category
    getSingleCategory: build.query({
      query: (id) => {
        return {
          url: `${CATEGORY_URL}/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.CATEGORY],
    }),

    // Add category
    addCategory: build.mutation({
      query: (formData) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [tagTypes.CATEGORY],
    }),

    // Update category
    updateCategory: build.mutation({
      query: ({ id, formData }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "PATCH", 
        body: formData,
      }),
      invalidatesTags: [tagTypes.CATEGORY],
    }),

    // Delete category
    deleteCategory: build.mutation({
      query: (id) => {
        return {
          url: `${CATEGORY_URL}/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.CATEGORY],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
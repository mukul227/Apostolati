import { ApiHomeInventory, BASE_URL } from "@/utils/APIinventory";
import { baseApi } from "./baseApi";

const homeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    allClubList: build.mutation({
      query: (credentials) => ({
        url: ApiHomeInventory.getAllClubList,
        method: "GET",
        body: credentials,
      }),
    }),

    getMyClubList: build.mutation({
      query: (credentials) => ({
        url: ApiHomeInventory.getMyClubs,
        method: "GET",
        body: credentials,
      }),
    }),
    addEnrollData: build.mutation({
      query: (credentials) => ({
        url: ApiHomeInventory.addEnroll,
        method: "POST",
        body: credentials,
      }),
    }),
    getEnrollData: build.mutation({
      query: (url) => ({
        url: url,
        method: "GET",
        // body: credentials,
      }),
    }),
    searchDesination: build.mutation({
      query: (searchText) => ({
        url: ApiHomeInventory.getEnrollData + searchText,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAllClubListMutation,
  useAddEnrollDataMutation,
  useGetEnrollDataMutation,
  useGetMyClubListMutation,
  useSearchDesinationMutation,
} = homeApi;

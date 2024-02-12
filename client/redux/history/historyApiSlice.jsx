import { apiSlice } from "../api/apiSlice";

const historyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHistoryData: builder.query({
      query: () => ({
        url: "/history",
        method: "GET",
      }),
    }),
    getHistoryDetails: builder.query({
      query: (id) => ({
        url: `/history/get-history/${id}`,
        method: "GET",
      }),
    }),
    createHistory: builder.mutation({
      query: (credentials) => ({
        url: "/history",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    updateHistory: builder.mutation({
      query: (initialHistoryData) => ({
        url: "/history",
        method: "PATCH",
        body: { ...initialHistoryData },
      }),
    }),
    deleteHistory: builder.mutation({
      query: (id) => ({
        url: "/history",
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetHistoryDataQuery,
  useGetHistoryDetailsQuery,
  useCreateHistoryMutation,
  useUpdateHistoryMutation,
  useDeleteHistoryMutation,
} = historyApiSlice;

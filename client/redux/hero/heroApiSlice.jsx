import { apiSlice } from "../api/apiSlice";

const heroApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: () => ({
        url: '/hero',
        method: "GET",
      }),
    }),
    updateHero: builder.mutation({
      query: ({ title, desc, type, image }) => ({
        url: "/hero",
        method: "PATCH",
        body: { title, desc, image, type },
      }),
    }),
  }),
});

export const {
  useGetHeroDataQuery,
  useUpdateHeroMutation,
} = heroApiSlice;

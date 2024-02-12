import { apiSlice } from "../api/apiSlice";

const skillsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSkillsData: builder.query({
      query: () => ({
        url: "/skills",
        method: "GET",
      }),
    }),
    getSkillDetails: builder.query({
      query: (id) => ({
        url: `/skills/get-skill/${id}`,
        method: "GET",
      }),
    }),
    createSkills: builder.mutation({
      query: (credentials) => ({
        url: "/skills",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    updateSkills: builder.mutation({
      query: (initialSkillsData) => ({
        url: "/skills",
        method: "PATCH",
        body: { ...initialSkillsData },
      }),
    }),
  }),
});

export const {
  useGetSkillsDataQuery,
  useGetSkillDetailsQuery,
  useCreateSkillsMutation,
  useUpdateSkillsMutation,
} = skillsApiSlice;

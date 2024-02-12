import { apiSlice } from "../api/apiSlice";

const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjectsData: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
    }),
    getProjectsDetails: builder.query({
      query: (id) => ({
        url: `/projects/get-projects/${id}`,
        method: "GET",
      }),
    }),
    createProjects: builder.mutation({
      query: (credentials) => ({
        url: "/projects",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    updateProjects: builder.mutation({
      query: (initialProjectsData) => ({
        url: "/projects",
        method: "PATCH",
        body: { ...initialProjectsData },
      }),
    }),
    deleteProjects: builder.mutation({
      query: (id) => ({
        url: "/projects",
        method: "DELETE",
        body: { id },
      }),
    }),
  }),
});

export const {
  useGetProjectsDataQuery,
  useGetProjectsDetailsQuery,
  useCreateProjectsMutation,
  useUpdateProjectsMutation,
  useDeleteProjectsMutation,
} = projectsApiSlice;

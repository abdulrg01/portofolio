import { apiSlice } from "../api/apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editProfile: builder.mutation({
      query: (credentials) => ({
        url: "users/updateUser",
        method: "PATCH",
        body: { ...credentials },
      }),
    }),
    updateAvatar: builder.mutation({
      query: (avatar) => ({
        url: "users/set-user-image",
        method: "PUT",
        body: { avatar },
      }),
    }),
  }),
});

export const { useEditProfileMutation, useUpdateAvatarMutation } =
  userApiSlice;

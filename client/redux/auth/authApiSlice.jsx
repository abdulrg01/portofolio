import { apiSlice } from "../api/apiSlice";
import { logOut, setCredentials, setUser } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getUserInfo: builder.query({
      query: () => ({
        url: "users/get-user-info",
        method: "GET",
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "users/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { token, user } = data;
          dispatch(setCredentials({ token }));
          dispatch(setUser({ user }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserInfoQuery,
  useRefreshMutation,
  useSendLogoutMutation,
} = authApiSlice;

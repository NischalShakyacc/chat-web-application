import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
const applicationApi = createApi({
  reducerPath: 'applicationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5001'
  }),

  endpoints: (builder) => ({
    
    //endpoint to create a user
    signupUser: builder.mutation({
      query: (user) => ({
        url: '/users',
        method: 'POST',
        body: user,
      }),
    }),

    //endpoint to login
    loginUser: builder.mutation({
      query: (user) => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
    }),

    //endpoint to logout a user
    logoutUser: builder.mutation({
      query: (payload) => ({
        url: '/logout',
        method: 'DELETE',
        body: payload,
      }),
    }),
  }),
});

// hooks like functions to acccess endpoints
// hooks like functions to access endpoints
export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation } = applicationApi;
export default applicationApi;

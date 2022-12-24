import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../config";

// define a service user a base URL

const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://discounts-space.com/public/api/coupons",
    }),

    endpoints: (builder) => ({
        // login
        loginUser: builder.mutation({
            query: (user) => ({
                url: "/users/login",
                method: "POST",
                body: user,
            }),
        }),

        // logout 
        logoutUser: builder.mutation({
            query: (payload) => ({
                url: "/logout",
                method: "DELETE",
                body: payload,
            }),
        }),


        // fetch data groups
        fetchHomeData: builder.query({
            query: () => ({
                url: `?token=${config.AUTH_TOKEN}&paginate=10&graph=featured&type=deals`,
                method: "GET",
            }),
        }),



    }),
});

export const { useLoginUserMutation, useLogoutUserMutation, useFetchHomeDataQuery } = appApi;

export default appApi;
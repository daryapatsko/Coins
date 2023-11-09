import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coinCapApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2' }),
  endpoints: (builder) => ({
    getDataPerPage: builder.query({
      query: (page) => `/assets?limit=${page * 20}`,
    }),
    getCoinItem: builder.query({
      query: (id) => `/assets/${id}`,
    }),
    getCoinHistory: builder.query({
      query: ({ id, int }) => `/assets/${id}/history?interval=${int}`,
    }),
  }),
});

export const {useGetDataPerPageQuery, useGetCoinItemQuery,useGetCoinHistoryQuery } = coinCapApi;

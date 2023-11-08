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
  }),
});

export const {useGetDataPerPageQuery, useGetCoinItemQuery } = coinCapApi;

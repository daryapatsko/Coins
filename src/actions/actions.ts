import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const coinCapApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2' }),
  endpoints: (builder) => ({
    getDataList: builder.query({
      query: () => `/assets`,
    }),
    getDataPerPage: builder.query({
        query: (limit) => `/assets?limit=${limit}`,
      }),
  }),
});

export const { useGetDataListQuery, useGetDataPerPageQuery } = coinCapApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiDetailsResponse, ApiResponse } from '../types';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.giphy.com/v1/gifs';
const perPage = 24;

export const giphyApi = createApi({
  reducerPath: 'giphyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    searchGifs: builder.query<ApiResponse, { query: string; offset?: number }>({
      query: ({ query, offset = 0 }) => {
        return query.trim()
          ? `/search?api_key=${API_KEY}&q=${query}&limit=${perPage}&offset=${offset}&rating=r&lang=en&bundle=messaging_non_clips`
          : `/trending?api_key=${API_KEY}&limit=${perPage}&offset=${offset}&rating=r&lang=en&bundle=messaging_non_clips`;
      },
    }),
    detail: builder.query<ApiDetailsResponse, { id: string }>({
      query: ({ id }) => `${id}?api_key=${API_KEY}&rating=r`,
    }),
  }),
});

export const { useSearchGifsQuery, useDetailQuery } = giphyApi;

import { ApiDetailsResponse, ApiResponse } from '../types';
import getData from './getData';

const api_key = import.meta.env.VITE_API_KEY;
const perPage = 24;

export async function search(
  query: string,
  offset: number = 0
): Promise<{
  success: boolean;
  data?: ApiResponse;
  error?: string;
}> {
  const data = await getData<ApiResponse>(
    `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&limit=${perPage}&offset=${offset}&rating=r&lang=en&bundle=messaging_non_clips`
  );

  return data;
}

export async function trending(offset: number): Promise<{
  success: boolean;
  data?: ApiResponse;
  error?: string;
}> {
  const data = await getData<ApiResponse>(
    `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=${perPage}&offset=${offset}&rating=r&lang=en&bundle=messaging_non_clips`
  );

  return data;
}

export async function detail(id: string): Promise<{
  success: boolean;
  data?: ApiDetailsResponse;
  error?: string;
}> {
  const data = await getData<ApiDetailsResponse>(
    `https://api.giphy.com/v1/gifs/${id}?api_key=${api_key}&rating=r`
  );

  return data;
}

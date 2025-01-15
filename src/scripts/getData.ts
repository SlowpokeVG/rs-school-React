import { ApiResponse } from '../types';

export default async function getData(url: string): Promise<{
  success: boolean;
  data?: ApiResponse;
  error?: string;
}> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

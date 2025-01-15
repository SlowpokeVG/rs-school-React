import { ApiResponse } from "../types";

export default async function getData(query: string, offset: number): Promise<{
    success: boolean;
    data?: ApiResponse;
    error?: string;
}> {
    const api_key = '3POawzSyTkkosbyTA052fjCzjxnQmdQP';

    try {
        const response = await fetch(
            `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${query}&limit=24&offset=${offset}&rating=g&lang=en&bundle=messaging_non_clips`
        );

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


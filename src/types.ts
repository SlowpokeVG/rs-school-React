export interface Gif {
    id: string;
    title: string;
    images: {
        fixed_height: {
            url: string;
        };
    };
}

export interface ApiResponse {
    data: Gif[];
    pagination: {
        total_count: number;
        count: number;
        offset: number;
    };
    meta: {
        status: number;
        msg: string;
        response_id: string;
    };
}
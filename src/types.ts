export interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
  alt_text: string;
}

export interface ApiResponse {
  data: Gif[];
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
  pagination?: {
    total_count: number;
    count: number;
    offset: number;
  };
}

export interface ResultItemProps {
  gif: Gif;
}

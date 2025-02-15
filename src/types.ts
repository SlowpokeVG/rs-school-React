export interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
    alt_text: string;
  };
  type: string;
  import_datetime: string;
  source: string;

  user?: {
    display_name: string;
    avatar_url: string;
    description: string;
    username: string;
  };
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

export interface ApiDetailsResponse {
  data: Gif;
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

export interface ResultItemsProps {
  gifs: Gif[];
}

export interface CheckboxProps {
  id: string;
}

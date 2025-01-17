export interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
  user: {
    display_name: string;
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

export interface ResultItemProps {
  gif: Gif;
}

export interface ResultItemsProps {
  gifs: Gif[];
}

export interface SearchProps {
  formSubmit: (query: string, event: React.FormEvent) => void;
  query: string;
  setQuery: (query: string) => void;
}

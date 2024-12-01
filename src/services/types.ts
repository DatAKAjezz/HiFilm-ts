export interface MovieListResponse {
    currentPage: number;
    totalPages: number;
    items: Movie[];
}
  
export interface Movie {
    _id: string;
    slug: string;
    name: string;
    origin_name: string;
    thumb_url: string;
    year: string;
    category: string[];
    view: number;
}

export interface MovieDetail {
    _id: string;
    slug: string;
    name: string;
    origin_name: string;
    thumb_url: string;
    year: string;
    category: string[];
    episodes: Episode[];
}
  
export interface Episode {
    server_name: string;
    server_data: EpisodeData[];
}
  
export interface EpisodeData {
    name: string;
    slug: string;
    url: string;
}
    
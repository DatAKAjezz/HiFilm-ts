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

export interface MovieDetails {
    status: boolean;
    msg: string;
    movie: {
      tmdb: {
        type: string;
        id: string;
        season: number;
        vote_average: number;
        vote_count: number;   
      }

      imdb?: {
        id?: string | null;
      };

      created: {
        time: string;
      };
      modified: {
        time: string;
      };
      _id: string;
      name: string;
      slug: string;
      origin_name: string;
      content: string;
      type: string;
      status: string;
      thumb_url: string;
      poster_url: string;
      is_copyright: boolean;
      sub_docquyen: boolean;
      chieurap: boolean;
      trailer_url?: string;
      time: string;
      episode_current: string;
      episode_total: string;
      quality: string;
      lang: string;
      notify?: string;
      showtimes?: string;
      year: number;
      view: number;
      actor: string[];
      director: string[];
      category: Array<{
        id: string;
        name: string;
        slug: string;
      }>;
      country: Array<{
        id: string;
        name: string;
        slug: string;
      }>;
      episodes: Array<{
        server_name: string;
        server_data: Array<{
          name: string;
          slug: string;
          filename: string;
          link_embed: string;
          link_m3u8: string;
        }>;
      }>;
    };
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
    
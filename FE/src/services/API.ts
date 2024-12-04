import axios, { AxiosInstance } from "axios";
import { Movie, MovieDetails, MovieListResponse } from "./types";
import axiosRateLimit from "axios-rate-limit";

const api: AxiosInstance = axios.create({
  baseURL: "https://ophim1.com/",
  timeout: 3000,
})
// random rate nma vẫn k thay đôỉ j

export const getNewMovies = async (
  page: number = 1
): Promise<MovieListResponse> => {
  const res = await api.get(`danh-sach/phim-moi-cap-nhat?page=${page}`);
  return res.data as MovieListResponse;
};

export const getMovieDetails = async (slug: string): Promise<MovieDetails> => {
  const response = await api.get(`phim/${slug}`);
  return response.data as MovieDetails;
};

export const getAllMovies = async (): Promise<Movie[]> => {
  let allMovies: Movie[] = [];
  let currentPage = 1;

  const startTime = Date.now();

  while (true) {
    try {
      const res = await api.get<MovieListResponse>(`danh-sach/phim-moi-cap-nhat?page=${currentPage}`);
      const movies = res.data.items;
      console.log('hello');

      if (!movies || movies.length === 0) {
        break;
      }

      allMovies = allMovies.concat(movies);

      if (currentPage >= res.data.totalPages) {
        const endTime = Date.now();
        console.log("fetching time: ", endTime - startTime);
        break;
      }

      currentPage++;
    } catch (error) {
      console.error("Error fetching movies:", error);
      break;
    }
  }

  return allMovies;
};


export default api;

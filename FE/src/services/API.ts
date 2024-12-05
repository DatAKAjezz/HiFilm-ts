import axios, { AxiosInstance } from "axios";
import { MovieDetails, MovieListResponse } from "./types";

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

export const getMovieDetailsWithPage = async (page: number = 1): Promise<MovieDetails[]> => {
  const data = await getNewMovies(page);

  const detailsPromises = data.items.map((movie) => {
    return getMovieDetails(movie.slug);
  })

  const details = await Promise.all(detailsPromises);
  return details as MovieDetails[]
}


export default api;


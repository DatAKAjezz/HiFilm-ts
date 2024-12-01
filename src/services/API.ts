import axios, { Axios, AxiosInstance } from "axios";
import { MovieListResponse, Movie, MovieDetail } from "./types";

const api: AxiosInstance = axios.create({
  baseURL: 'https://ophim1.com/',
  timeout: 10000
})

export const getNewMovies = async (page: number = 1): Promise<MovieListResponse> => {
  const res = await api.get(`danh-sach/phim-moi-cap-nhat?page=${page}`)
  return res.data as MovieListResponse
}

export const getMovieDetails = async (slug: string): Promise<MovieDetail> => {
  const response = await api.get(`phim/${slug}`);
  return response.data as MovieDetail;
}

export default api
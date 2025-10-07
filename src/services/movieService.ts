import axios from 'axios';
import type { Movie } from '../types/movie';

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
});

export async function fetchMovies(query: string, page: number): Promise<TMDBResponse> {
  const response = await axiosInstance.get<TMDBResponse>('/search/movie', {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
  });
  return response.data;
}

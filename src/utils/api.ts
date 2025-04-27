import { Movie } from "../types";

const tmdbKey = process.env.REACT_APP_API_KEY;
const tmdbBaseUrl = "https://api.themoviedb.org/3";

const options: RequestInit = {
  method: "GET",
  headers: { accept: "application/json" },
};

export const fetchMovies = async (
  searchTerm: string,
  pageNumber: number
): Promise<{ results: Movie[]; totalPages: number }> => {
  const requestParams = `?api_key=${tmdbKey}&query=${searchTerm}&page=${pageNumber}&language=en`;

  const response = await fetch(
    `${tmdbBaseUrl}/search/movie${requestParams}`,
    options
  );
  const data = await response.json();

  return {
    results: data.results,
    totalPages: data.total_pages,
  };
};

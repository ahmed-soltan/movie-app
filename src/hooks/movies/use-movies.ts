import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMovies,
  getAllMovies,
  getMoviesError,
  getMoviesStatus,
} from "@/features/movies/moviesSlice";
import { AppDispatch } from "@/store";

export const useMovies = (params?: string) => {
  const moviesState = useSelector(getMoviesStatus);
  const moviesError = useSelector(getMoviesError);
  const movies = useSelector(getAllMovies);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMovies(params));
  }, [params]);

  return {
    loading: moviesState === "idle",
    error: moviesError,
    data: movies,
  };
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store";
import {
  fetchMoviesGenre,
  getAllMoviesGenre,
  getMoviesGenreError,
  getMoviesGenreStatus,
} from "@/features/movies/movieGenreSlice";

export const useMoviesGenres = (params?: string) => {
  const moviesState = useSelector(getMoviesGenreStatus);
  const moviesError = useSelector(getMoviesGenreError);
  const movies = useSelector(getAllMoviesGenre);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMoviesGenre(params));
  }, [params]);

  return {
    loading: moviesState === "idle",
    error: moviesError,
    data: movies,
  };
};

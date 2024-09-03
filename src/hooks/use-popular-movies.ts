import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store";
import {
  fetchPopularMovies,
  selectPopularError,
  selectPopularMovies,
  selectPopularStatus,
} from "@/features/movies/popularSlice";

export const usePopularMovies = () => {
  const PopularMoviesState = useSelector(selectPopularStatus);
  const PopularMoviesError = useSelector(selectPopularError);
  const PopularMovies = useSelector(selectPopularMovies);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (PopularMoviesState === "idle") {
      dispatch(fetchPopularMovies());
    }
  }, [dispatch, PopularMoviesState]);

  return {
    loading: PopularMoviesState === "idle",
    error: PopularMoviesError,
    data: PopularMovies,
  };
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store";
import {
  fetchMovieDetails,
  getMovieDetails,
  getMovieDetailsError,
  getMovieDetailsStatus,
} from "@/features/movies/movieDetailsSlice";

export const useMovieDetails = (movieId: number) => {
  const movieDetailsState = useSelector(getMovieDetailsStatus);
  const movieDetailsError = useSelector(getMovieDetailsError);
  const movieDetails = useSelector(getMovieDetails);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (movieDetailsState === "idle") {
      dispatch(fetchMovieDetails(movieId));
    }
  }, [dispatch, movieDetailsState]);

  return {
    loading: movieDetailsState === "idle",
    error: movieDetailsError,
    data: movieDetails,
  };
};

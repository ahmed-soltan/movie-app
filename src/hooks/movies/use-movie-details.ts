import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store";
import {
  fetchMovieDetails,
  getMovieDetails,
  getMovieDetailsStatus,
  getMovieDetailsError,
} from "@/features/movies/movieDetailsSlice";
import { useEffect } from "react";

export const useMovieDetails = (movieId: string) => {
  const movieDetailsState = useSelector(getMovieDetailsStatus);
  const movieDetailsError = useSelector(getMovieDetailsError);
  const movieDetails = useSelector(getMovieDetails);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (movieDetailsState === "idle") {
      dispatch(fetchMovieDetails(movieId));
    }
  }, [dispatch, movieId, movieDetailsState]);

  return {
    loading: movieDetailsState === "loading",
    error: movieDetailsError,
    data: movieDetails,
  };
};

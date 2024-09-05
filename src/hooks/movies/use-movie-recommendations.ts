import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMovieRecommendations,
  getMovieRecommendations,
  getMovieRecommendationsError,
  getMovieRecommendationsStatus,
} from "@/features/movies/movieRecommendationSlice";
import { AppDispatch } from "@/store";

export const useMovieRecommendations = (movieId:number) => {
  const movieRecommendationsState = useSelector(getMovieRecommendationsStatus);
  const movieRecommendationsError = useSelector(getMovieRecommendationsError);
  const movieRecommendations = useSelector(getMovieRecommendations);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (movieRecommendationsState === "idle") {
      dispatch(fetchMovieRecommendations(movieId));
    }
  }, [dispatch, movieRecommendationsState]);

  return {
    loading: movieRecommendationsState === "idle",
    error: movieRecommendationsError,
    data: movieRecommendations,
  };
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchMovieReviews,
  getMovieReviews,
  getMovieReviewsError,
  getMovieReviewsStatus,
} from "@/features/movies/movieReviewsSlice";
import { AppDispatch } from "@/store";

export const useMovieReviews = (movieId:number , params?:string) => {
  const movieReviewsState = useSelector(getMovieReviewsStatus);
  const movieReviewsError = useSelector(getMovieReviewsError);
  const movieReviews = useSelector(getMovieReviews);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (movieReviewsState === "idle") {
      dispatch(fetchMovieReviews({movieId , params}));
    }
  }, [dispatch, movieReviewsState]);

  return {
    loading: movieReviewsState === "idle",
    error: movieReviewsError,
    data: movieReviews,
  };
};

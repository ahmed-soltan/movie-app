import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchTopRatedMovies,
  selectTopRatedMovies,
  selectTopRatedStatus,
  selectTopRatedError,
} from "@/features/movies/topRatedSlice";
import { AppDispatch } from "@/store";

export const useTopRatedMovies = () => {
  const dispatch = useDispatch<AppDispatch>();

  const movies = useSelector(selectTopRatedMovies);
  const status = useSelector(selectTopRatedStatus);
  const error = useSelector(selectTopRatedError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTopRatedMovies());
    }
  }, [dispatch, status]);

  return { movies, status, error };
};

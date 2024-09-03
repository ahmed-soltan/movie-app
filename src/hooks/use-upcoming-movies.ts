import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchUpcomingMovies,
  selectUpcomingMovies,
  selectUpcomingStatus,
  selectUpcomingError,
} from "@/features/movies/upcomingSlice";
import { AppDispatch } from "@/store";

export const useUpcomingMovies = () => {
  const dispatch = useDispatch<AppDispatch>();

  const movies = useSelector(selectUpcomingMovies);
  const status = useSelector(selectUpcomingStatus);
  const error = useSelector(selectUpcomingError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUpcomingMovies());
    }
  }, [dispatch, status]);

  return { movies, status, error };
};

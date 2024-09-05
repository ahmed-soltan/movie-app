import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchUpcomingMovies,
  selectUpcomingMovies,
  selectUpcomingStatus,
  selectUpcomingError,
} from "@/features/movies/upcomingSlice";
import { AppDispatch } from "@/store";

export const useUpcomingMovies = (params?:string) => {
  const dispatch = useDispatch<AppDispatch>();

  const upComingMovies = useSelector(selectUpcomingMovies);
  const upComingMoviesStatus = useSelector(selectUpcomingStatus);
  const upComingMoviesError = useSelector(selectUpcomingError);

  useEffect(() => {
      dispatch(fetchUpcomingMovies(params));
  }, [params]);

  return {
    loading: upComingMoviesStatus === "idle",
    error: upComingMoviesError,
    data: upComingMovies,
  };};

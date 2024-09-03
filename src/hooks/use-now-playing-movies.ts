import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchNowPlayingMovies,
  getNowPlayingMovies,
  getNowPlayingMoviesError,
  getNowPlayingMoviesStatus,
} from "@/features/movies/nowPlayingMoviesSlice";
import { AppDispatch } from "@/store";

export const useNowPlayingMovies = () => {
  const nowPlayingMoviesState = useSelector(getNowPlayingMoviesStatus);
  const nowPlayingMoviesError = useSelector(getNowPlayingMoviesError);
  const nowPlayingMovies = useSelector(getNowPlayingMovies);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (nowPlayingMoviesState === "idle") {
      dispatch(fetchNowPlayingMovies());
    }
  }, [dispatch, nowPlayingMoviesState]);

  return {
    loading: nowPlayingMoviesState === "loading",
    error: nowPlayingMoviesError,
    data: nowPlayingMovies,
  };
};

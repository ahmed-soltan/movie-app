import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchNowPlayingMovies,
  getNowPlayingMovies,
  getNowPlayingMoviesError,
  getNowPlayingMoviesStatus,
} from "@/features/movies/nowPlayingMoviesSlice";
import { AppDispatch } from "@/store";

export const useNowPlayingMovies = (params?:string) => {
  const nowPlayingMoviesState = useSelector(getNowPlayingMoviesStatus);
  const nowPlayingMoviesError = useSelector(getNowPlayingMoviesError);
  const nowPlayingMovies = useSelector(getNowPlayingMovies);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
      dispatch(fetchNowPlayingMovies(params));
  }, [params]);

  return {
    loading: nowPlayingMoviesState === "loading",
    error: nowPlayingMoviesError,
    data: nowPlayingMovies,
  };
};

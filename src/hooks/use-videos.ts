import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store";
import {
  fetchVideos,
  getVideos,
  getVideosError,
  getVideosStatus,
} from "@/features/actions/videosSlice";

export const useVideos = (media: string, mediaId: string) => {
  const movieDetailsState = useSelector(getVideosStatus);
  const movieDetailsError = useSelector(getVideosError);
  const movieDetails = useSelector(getVideos);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (movieDetailsState === "idle") {
      dispatch(fetchVideos({ mediaId , media}));
    }
  }, [dispatch, movieDetailsState]);

  return {
    loading: movieDetailsState === "idle",
    error: movieDetailsError,
    data: movieDetails,
  };
};

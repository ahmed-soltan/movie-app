import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store";

import {
  fetchEpisodeDetails,
  getEpisodeDetails,
  getEpisodeDetailsError,
  getEpisodeDetailsStatus,
} from "@/features/tv/episodeDetailsSlice";

export const useEpisodeDetails = (
  seriesId: number,
  seasonNumber: number,
  episodeNumber: number
) => {
  const EpisodeDetailsState = useSelector(getEpisodeDetailsStatus);
  const EpisodeDetailsError = useSelector(getEpisodeDetailsError);
  const EpisodeDetails = useSelector(getEpisodeDetails);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (EpisodeDetailsState === "idle") {
      dispatch(fetchEpisodeDetails({ seriesId, seasonNumber, episodeNumber }));
    }
  }, [dispatch, EpisodeDetailsState]);

  return {
    loading: EpisodeDetailsState === "idle",
    error: EpisodeDetailsError,
    data: EpisodeDetails,
  };
};

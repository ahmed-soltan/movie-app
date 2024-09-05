import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store";
import {
  fetchSeasonDetails,
  getSeasonDetails,
  getSeasonDetailsError,
  getSeasonDetailsStatus,
} from "@/features/tv/seasonDetailsSlice";

export const useSeasonDetails = (seriesId: number, seasonNumber: number) => {
  const SeasonDetailsState = useSelector(getSeasonDetailsStatus);
  const SeasonDetailsError = useSelector(getSeasonDetailsError);
  const SeasonDetails = useSelector(getSeasonDetails);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (SeasonDetailsState === "idle") {
      dispatch(fetchSeasonDetails({ seriesId, seasonNumber }));
    }
  }, [dispatch, SeasonDetailsState]);

  return {
    loading: SeasonDetailsState === "idle",
    error: SeasonDetailsError,
    data: SeasonDetails,
  };
};

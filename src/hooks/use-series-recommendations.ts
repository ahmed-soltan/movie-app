import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store";
import {
  fetchSeriesRecommendations,
  getSeriesRecommendations,
  getSeriesRecommendationsError,
  getSeriesRecommendationsStatus,
} from "@/features/tv/seriesRecommendationSlice";

export const useSeriesRecommendations = (seriesId: number) => {
  const SeriesRecommendationsState = useSelector(
    getSeriesRecommendationsStatus
  );
  const SeriesRecommendationsError = useSelector(getSeriesRecommendationsError);
  const SeriesRecommendations = useSelector(getSeriesRecommendations);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (SeriesRecommendationsState === "idle") {
      dispatch(fetchSeriesRecommendations(seriesId));
    }
  }, [dispatch, SeriesRecommendationsState]);

  return {
    loading: SeriesRecommendationsState === "idle",
    error: SeriesRecommendationsError,
    data: SeriesRecommendations,
  };
};

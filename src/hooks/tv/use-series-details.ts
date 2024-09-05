import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store";
import {
  fetchSeriesDetails,
  getSeriesDetails,
  getSeriesDetailsError,
  getSeriesDetailsStatus,
} from "@/features/tv/seriesDetailsSlice";

export const useSeriesDetails = (seriesId: number) => {
  const SeriesDetailsState = useSelector(getSeriesDetailsStatus);
  const SeriesDetailsError = useSelector(getSeriesDetailsError);
  const SeriesDetails = useSelector(getSeriesDetails);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (SeriesDetailsState === "idle") {
      dispatch(fetchSeriesDetails(seriesId));
    }
  }, [dispatch, SeriesDetailsState]);

  return {
    loading: SeriesDetailsState === "idle",
    error: SeriesDetailsError,
    data: SeriesDetails,
  };
};

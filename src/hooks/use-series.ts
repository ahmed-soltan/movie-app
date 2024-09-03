import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSeries,
  getAllSeries,
  getSeriesError,
  getSeriesStatus,
} from "@/features/tv/seriesSlice";
import { AppDispatch } from "@/store";

export const useSeries = () => {
  const SeriesState = useSelector(getSeriesStatus);
  const SeriesError = useSelector(getSeriesError);
  const Series = useSelector(getAllSeries);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (SeriesState === "idle") {
      dispatch(fetchSeries());
    }
  }, [dispatch, SeriesState]);

  return {
    loading: SeriesState === "idle",
    error: SeriesError,
    data: Series,
  };
};

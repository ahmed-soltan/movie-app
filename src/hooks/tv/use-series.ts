import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSeries,
  getAllSeries,
  getSeriesError,
  getSeriesStatus,
} from "@/features/tv/seriesSlice";
import { AppDispatch } from "@/store";

export const useSeries = (params?:string) => {
  const SeriesState = useSelector(getSeriesStatus);
  const SeriesError = useSelector(getSeriesError);
  const Series = useSelector(getAllSeries);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
      dispatch(fetchSeries(params));
  }, [params]);

  return {
    loading: SeriesState === "idle",
    error: SeriesError,
    data: Series,
  };
};

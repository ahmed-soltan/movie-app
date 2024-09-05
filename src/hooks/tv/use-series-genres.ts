import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store";
import {
  fetchSeriesGenre,
  getAllSeriesGenre,
  getSeriesGenreError,
  getSeriesGenreStatus,
} from "@/features/tv/seriesGenreSlice";

export const useSeriesGenres = (params?: string) => {
  const SeriesState = useSelector(getSeriesGenreStatus);
  const SeriesError = useSelector(getSeriesGenreError);
  const Series = useSelector(getAllSeriesGenre);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSeriesGenre(params));
  }, [params]);

  return {
    loading: SeriesState === "idle",
    error: SeriesError,
    data: Series,
  };
};

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSeriesReviews,
  getSeriesReviews,
  getSeriesReviewsError,
  getSeriesReviewsStatus,
} from "@/features/tv/seriesReviewsSlice";
import { AppDispatch } from "@/store";

export const useSeriesReviews = (movieId:number) => {
  const SeriesReviewsState = useSelector(getSeriesReviewsStatus);
  const SeriesReviewsError = useSelector(getSeriesReviewsError);
  const SeriesReviews = useSelector(getSeriesReviews);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (SeriesReviewsState === "idle") {
      dispatch(fetchSeriesReviews(movieId));
    }
  }, [dispatch, SeriesReviewsState]);

  return {
    loading: SeriesReviewsState === "idle",
    error: SeriesReviewsError,
    data: SeriesReviews,
  };
};

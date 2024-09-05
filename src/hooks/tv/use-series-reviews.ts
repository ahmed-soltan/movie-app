import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSeriesReviews,
  getSeriesReviews,
  getSeriesReviewsError,
  getSeriesReviewsStatus,
} from "@/features/tv/seriesReviewsSlice";
import { AppDispatch } from "@/store";

export const useSeriesReviews = (seriesId:number , params?:string) => {
  const SeriesReviewsState = useSelector(getSeriesReviewsStatus);
  const SeriesReviewsError = useSelector(getSeriesReviewsError);
  const SeriesReviews = useSelector(getSeriesReviews);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
      dispatch(fetchSeriesReviews({seriesId , params}));
  }, [params]);

  return {
    loading: SeriesReviewsState === "idle",
    error: SeriesReviewsError,
    data: SeriesReviews,
  };
};

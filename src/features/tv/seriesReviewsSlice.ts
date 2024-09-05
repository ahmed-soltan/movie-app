import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchData } from "@/utils/fetch-data";
import { ReviewsResponse } from "@/types";
import { RootState } from "@/store";

export const fetchSeriesReviews = createAsyncThunk(
  "SeriesReviews/fetchSeriesReviews",
  async ({seriesId , params}:{seriesId:number,params?:string}) => {
    const data = await fetchData(`/tv/${seriesId}/reviews`,params);
    return data;
  }
);

export interface SeriesReviewsState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  reviews: ReviewsResponse | null;
}

const initialState: SeriesReviewsState = {
  reviews: null,
  status: "idle",
  error: null,
};

export const SeriesReviewsSlice = createSlice({
  name: "seriesReviews",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSeriesReviews.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSeriesReviews.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.reviews = action.payload;
    });
    builder.addCase(fetchSeriesReviews.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = SeriesReviewsSlice.actions;

export default SeriesReviewsSlice.reducer;

export const getSeriesReviews = (state: RootState) =>
  state.seriesReviews.reviews;
export const getSeriesReviewsStatus = (state: RootState) =>
  state.seriesReviews.status;
export const getSeriesReviewsError = (state: RootState) =>
  state.seriesReviews.error;

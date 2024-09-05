import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchData } from "@/utils/fetch-data";
import { MediaItemType } from "@/types";
import { RootState } from "@/store";

export const fetchSeriesRecommendations = createAsyncThunk(
  "SeriesRecommendations/fetchSeriesRecommendations",
  async (seriesId: number) => {
    const data = await fetchData(`/tv/${seriesId}/recommendations`);
    return data;
  }
);

export interface SeriesRecommendationsState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  recommendations: MediaItemType[] | null;
}

const initialState: SeriesRecommendationsState = {
  recommendations: null,
  status: "idle",
  error: null,
};

export const SeriesRecommendationsSlice = createSlice({
  name: "seriesRecommendations",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSeriesRecommendations.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSeriesRecommendations.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.recommendations = action.payload.results;
    });
    builder.addCase(fetchSeriesRecommendations.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = SeriesRecommendationsSlice.actions;

export default SeriesRecommendationsSlice.reducer;

export const getSeriesRecommendations = (state: RootState) =>
  state.seriesRecommendations.recommendations;
export const getSeriesRecommendationsStatus = (state: RootState) =>
  state.seriesRecommendations.status;
export const getSeriesRecommendationsError = (state: RootState) =>
  state.seriesRecommendations.error;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { MovieDetails } from "@/types";

export const fetchSeriesDetails = createAsyncThunk(
  "series/fetchSeriesDetails",
  async (seriesId: number) => {
    const data = await fetchData(`/tv/${seriesId}`);
    return data;
  }
);

export interface SeriesState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  seriesDetails: MovieDetails | null;
}

const initialState: SeriesState = {
  seriesDetails: null,
  status: "idle",
  error: null,
};

export const seriesDetailsSlice = createSlice({
  name: "series",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSeriesDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSeriesDetails.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.seriesDetails = action.payload;
    });
    builder.addCase(fetchSeriesDetails.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = seriesDetailsSlice.actions;

export default seriesDetailsSlice.reducer;

export const getSeriesDetails = (state: RootState) =>
  state.seriesDetails.seriesDetails;
export const getSeriesDetailsStatus = (state: RootState) =>
  state.seriesDetails.status;
export const getSeriesDetailsError = (state: RootState) =>
  state.seriesDetails.error;
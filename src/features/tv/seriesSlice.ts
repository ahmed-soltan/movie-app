import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { Movie } from "@/types";

export const fetchSeries = createAsyncThunk("/series/fetchSeries", async () => {
  const data = await fetchData("/discover/movie");
  return data;
});

export interface seriesState {
  series: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: seriesState = {
  series: [],
  status: "idle",
  error: null,
};

export const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSeries.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSeries.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.series = action.payload;
    });
    builder.addCase(fetchSeries.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = seriesSlice.actions;

export default seriesSlice.reducer;

export const getAllSeries = (state: RootState) => state.series.series;
export const getSeriesStatus = (state: RootState) => state.series.status;
export const getSeriesError = (state: RootState) => state.series.error;

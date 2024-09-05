import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { MediaItemType } from "@/types";

export const fetchSeries = createAsyncThunk("/series/fetchSeries", async (params?:string) => {
  const data = await fetchData("/discover/tv" , params);
  return data;
});

export interface seriesState {
  series: {
    page: number;
    results: MediaItemType[];
    total_pages: number;
    total_results: number;
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: seriesState = {
  series: null,
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

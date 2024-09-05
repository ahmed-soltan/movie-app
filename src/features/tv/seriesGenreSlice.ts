import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { Genre } from "@/types";

export const fetchSeriesGenre = createAsyncThunk(
  "SeriesGenre/fetchSeriesGenre",
  async (params?: string) => {
    const data = await fetchData("/genre/tv/list", params);
    return data;
  }
);

export interface SeriesGenreState {
  seriesGenre: {
    genres:Genre[] 
}| null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: SeriesGenreState = {
  seriesGenre: null,
  status: "idle",
  error: null,
};

export const SeriesGenreSlice = createSlice({
  name: "SeriesGenre",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSeriesGenre.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSeriesGenre.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.seriesGenre = action.payload;
    });
    builder.addCase(fetchSeriesGenre.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = SeriesGenreSlice.actions;

export default SeriesGenreSlice.reducer;

export const getAllSeriesGenre = (state: RootState) =>
  state.seriesGenre.seriesGenre;
export const getSeriesGenreStatus = (state: RootState) =>
  state.seriesGenre.status;
export const getSeriesGenreError = (state: RootState) =>
  state.seriesGenre.error;

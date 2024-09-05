import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { Season } from "@/types";

export const fetchSeasonDetails = createAsyncThunk(
  "season/fetchSeasonDetails",
  async ({
    seriesId,
    seasonNumber,
  }: {
    seriesId: number;
    seasonNumber: number;
  }) => {
    const data = await fetchData(`/tv/${seriesId}/season/${seasonNumber}`);
    return data;
  }
);

export interface SeasonState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  seasonDetails: Season | null;
}

const initialState: SeasonState = {
  seasonDetails: null,
  status: "idle",
  error: null,
};

export const seasonDetailsSlice = createSlice({
  name: "season",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSeasonDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSeasonDetails.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.seasonDetails = action.payload;
    });
    builder.addCase(fetchSeasonDetails.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = seasonDetailsSlice.actions;

export default seasonDetailsSlice.reducer;

export const getSeasonDetails = (state: RootState) =>
  state.seasonDetails.seasonDetails;
export const getSeasonDetailsStatus = (state: RootState) =>
  state.seasonDetails.status;
export const getSeasonDetailsError = (state: RootState) =>
  state.seasonDetails.error;

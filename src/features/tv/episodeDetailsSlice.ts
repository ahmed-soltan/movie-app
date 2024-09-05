import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { Episode } from "@/types";

export const fetchEpisodeDetails = createAsyncThunk(
  "episode/fetchEpisodeDetails",
  async ({
    seriesId,
    seasonNumber,
    episodeNumber,
  }: {
    seriesId: number;
    seasonNumber: number;
    episodeNumber:number
  }) => {
    const data = await fetchData(`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`);
    return data;
  }
);

export interface EpisodeState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  episodeDetails: Episode | null;
}

const initialState: EpisodeState = {
  episodeDetails: null,
  status: "idle",
  error: null,
};

export const EpisodeDetailsSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchEpisodeDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchEpisodeDetails.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.episodeDetails = action.payload;
    });
    builder.addCase(fetchEpisodeDetails.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = EpisodeDetailsSlice.actions;

export default EpisodeDetailsSlice.reducer;

export const getEpisodeDetails = (state: RootState) =>
  state.episodeDetails.episodeDetails;
export const getEpisodeDetailsStatus = (state: RootState) =>
  state.episodeDetails.status;
export const getEpisodeDetailsError = (state: RootState) =>
  state.episodeDetails.error;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { Video } from "@/types";

export const fetchVideos = createAsyncThunk(
  "movies/fetchVideos",
  async ({ media, mediaId }: { media: string; mediaId: string }) => {
    const data = await fetchData(`/${media}/${mediaId}/videos`);
    return data;
  }
);

type VideosType={
    id: string;
    results:Video[]
}

export interface MoviesState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  videos: VideosType | null;
}

const initialState: MoviesState = {
  videos: null,
  status: "idle",
  error: null,
};

export const moviesDetailsSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchVideos.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.videos = action.payload;
    });
    builder.addCase(fetchVideos.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = moviesDetailsSlice.actions;

export default moviesDetailsSlice.reducer;

export const getVideos = (state: RootState) => state.videos.videos;
export const getVideosStatus = (state: RootState) => state.videos.status;
export const getVideosError = (state: RootState) => state.videos.error;

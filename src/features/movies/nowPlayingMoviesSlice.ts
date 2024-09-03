import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { Movie } from "@/types";

export const fetchNowPlayingMovies = createAsyncThunk(
  "movies/fetchNowPlayingMovies",
  async () => {
    const data = await fetchData(`/movie/now_playing`);
    return data;
  }
);

export interface MoviesState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  nowPlaying: {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  } | null;
}

const initialState: MoviesState = {
  nowPlaying: null,
  status: "idle",
  error: null,
};

export const nowPlayingMoviesSlice = createSlice({
  name: "nowPlayingMovies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNowPlayingMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.nowPlaying = action.payload;
      })
      .addCase(fetchNowPlayingMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default nowPlayingMoviesSlice.reducer;

export const getNowPlayingMovies = (state: RootState) =>
  state.nowPlayingMovies.nowPlaying;
export const getNowPlayingMoviesStatus = (state: RootState) =>
  state.nowPlayingMovies.status;
export const getNowPlayingMoviesError = (state: RootState) =>
  state.nowPlayingMovies.error;

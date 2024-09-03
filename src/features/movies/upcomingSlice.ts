import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { Movie } from "@/types";

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async () => {
    const data = await fetchData(`/movie/upcoming`);
    return data.results;
  }
);

interface UpcomingState {
  movies: Movie[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: UpcomingState = {
  movies: null,
  status: "idle",
  error: null,
};

const upcomingSlice = createSlice({
  name: "upcoming",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default upcomingSlice.reducer;

export const selectUpcomingMovies = (state: RootState) =>
  state.upcoming.movies;
export const selectUpcomingStatus = (state: RootState) =>
  state.upcoming.status;
export const selectUpcomingError = (state: RootState) =>
  state.upcoming.error;

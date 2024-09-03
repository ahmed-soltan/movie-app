import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { Movie } from "@/types";

export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRatedMovies",
  async () => {
    const data = await fetchData(`/movie/top_rated`);
    return data.results;
  }
);

interface TopRatedState {
  movies: Movie[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: TopRatedState = {
  movies: null,
  status: "idle",
  error: null,
};

const topRatedSlice = createSlice({
  name: "topRated",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default topRatedSlice.reducer;

export const selectTopRatedMovies = (state: RootState) =>
  state.topRated.movies;
export const selectTopRatedStatus = (state: RootState) =>
  state.topRated.status;
export const selectTopRatedError = (state: RootState) =>
  state.topRated.error;

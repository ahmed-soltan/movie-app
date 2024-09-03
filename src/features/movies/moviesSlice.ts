import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { Movie } from "@/types";

export const fetchMovies = createAsyncThunk("/movies/fetchMovies", async () => {
  const data = await fetchData("/discover/movie");
  return data;
});

export interface MoviesState {
  movies: {
    page:number;
    results:Movie[];
    total_pages: number;
    total_results: number;
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: MoviesState = {
  movies: null,
  status: "idle",
  error: null,
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMovies.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.movies = action.payload;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = moviesSlice.actions;

export default moviesSlice.reducer;

export const getAllMovies = (state: RootState) => state.movies.movies;
export const getMoviesStatus = (state: RootState) => state.movies.status;
export const getMoviesError = (state: RootState) => state.movies.error;

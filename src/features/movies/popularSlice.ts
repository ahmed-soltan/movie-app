import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { Movie } from "@/types";

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async () => {
    const data = await fetchData(`/movie/popular`);
    return data;
  }
);

interface PopularState {
  movies:  {
    page:number;
    results:Movie[];
    total_pages: number;
    total_results: number;
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: PopularState = {
  movies: null,
  status: "idle",
  error: null,
};

const popularSlice = createSlice({
  name: "popular",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default popularSlice.reducer;

export const selectPopularMovies = (state: RootState) => state.popular.movies;
export const selectPopularStatus = (state: RootState) => state.popular.status;
export const selectPopularError = (state: RootState) => state.popular.error;

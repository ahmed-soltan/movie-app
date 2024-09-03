import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { Movie, MovieDetails } from "@/types";

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMoviesDetails",
  async (movieId: number) => {
    const data = await fetchData(`/movie/${movieId}`);
    return data;
  }
);

export interface MoviesState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  movieDetails: MovieDetails | null;
  recommendations: Movie[] | null;
  reviews: Movie[] | null;
}

const initialState: MoviesState = {
  movieDetails: null,
  recommendations: [],
  reviews: [],
  status: "idle",
  error: null,
};

export const moviesDetailsSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMovieDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.movieDetails = action.payload;
    });
    builder.addCase(fetchMovieDetails.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = moviesDetailsSlice.actions;

export default moviesDetailsSlice.reducer;

export const getMovieDetails = (state: RootState) =>
  state.movieDetails.movieDetails;
export const getMovieDetailsStatus = (state: RootState) =>
  state.movieDetails.status;
export const getMovieDetailsError = (state: RootState) =>
  state.movieDetails.error;

export const getMovieRecommendations = (state: RootState) =>
  state.movieDetails.recommendations;

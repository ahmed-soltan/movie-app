import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { Movie, MovieDetails } from "@/types";

export const fetchSeriesDetails = createAsyncThunk(
  "movies/fetchMoviesDetails",
  async (seriesId: number) => {
    const data = await fetchData(`/tv/${seriesId}`);
    return data;
  }
);

export interface MoviesState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  seriesDetails: MovieDetails | null;
  recommendations: Movie[] | null;
  reviews: Movie[] | null;
}

const initialState: MoviesState = {
  seriesDetails: null,
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
    builder.addCase(fetchSeriesDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchSeriesDetails.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.seriesDetails = action.payload;
    });
    builder.addCase(fetchSeriesDetails.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = moviesDetailsSlice.actions;

export default moviesDetailsSlice.reducer;

export const getSeriesDetails = (state: RootState) =>
  state.seriesDetails.seriesDetails;
export const getSeriesDetailsStatus = (state: RootState) =>
  state.seriesDetails.status;
export const getSeriesDetailsError = (state: RootState) =>
  state.seriesDetails.error;

export const getMovieRecommendations = (state: RootState) =>
  state.seriesDetails.recommendations;

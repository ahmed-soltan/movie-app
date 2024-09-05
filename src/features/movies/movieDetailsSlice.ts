import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { MovieDetails } from "@/types";

export const fetchMovieDetails = createAsyncThunk(
  "movieDetails/fetchMovieDetails",
  async (movieId: string) => {
    const data = await fetchData(`/movie/${movieId}`);
    return data;
  }
);

export interface MovieState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  movieDetails: MovieDetails | null;
}

const initialState: MovieState = {
  movieDetails: null,
  status: "idle",
  error: null,
};

export const movieDetailsSlice = createSlice({
  name: "movieDetails",
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

export default movieDetailsSlice.reducer;

export const getMovieDetails = (state: RootState) => state.movieDetails.movieDetails;
export const getMovieDetailsStatus = (state: RootState) => state.movieDetails.status;
export const getMovieDetailsError = (state: RootState) => state.movieDetails.error;

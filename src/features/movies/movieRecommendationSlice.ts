import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "@/utils/fetch-data";
import { Movie } from "@/types";
import { RootState } from "@/store";

export const fetchMovieRecommendations = createAsyncThunk(
  "movieRecommendations/fetchMovieRecommendations",
  async (movieId: number) => {
    const data = await fetchData(`/movie/${movieId}/recommendations`);
    return data;
  }
);

export interface MovieRecommendationsState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  recommendations: Movie[] | null;
}

const initialState: MovieRecommendationsState = {
  recommendations: null,
  status: "idle",
  error: null,
};

export const movieRecommendationsSlice = createSlice({
  name: "movieRecommendations",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMovieRecommendations.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovieRecommendations.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.recommendations = action.payload.results;
    });
    builder.addCase(fetchMovieRecommendations.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = movieRecommendationsSlice.actions;

export default movieRecommendationsSlice.reducer;

export const getMovieRecommendations = (state: RootState) =>
  state.movieRecommendations.recommendations;
export const getMovieRecommendationsStatus = (state: RootState) =>
  state.movieRecommendations.status;
export const getMovieRecommendationsError = (state: RootState) =>
  state.movieRecommendations.error;

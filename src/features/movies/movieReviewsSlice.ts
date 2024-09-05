import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "@/utils/fetch-data";
import { ReviewsResponse } from "@/types";
import { RootState } from "@/store";

export const fetchMovieReviews = createAsyncThunk(
  "movieReviews/fetchMovieReviews",
  async ({movieId , params}:{movieId:number,params?:string}) => {
    const data = await fetchData(`/movie/${movieId}/reviews` , params);
    return data;
  }
);

export interface MovieReviewsState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  reviews: ReviewsResponse | null;
}

const initialState: MovieReviewsState = {
  reviews: null,
  status: "idle",
  error: null,
};

export const movieReviewsSlice = createSlice({
  name: "movieReviews",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMovieReviews.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMovieReviews.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.reviews = action.payload;
    });
    builder.addCase(fetchMovieReviews.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = movieReviewsSlice.actions;

export default movieReviewsSlice.reducer;

export const getMovieReviews = (state: RootState) => state.movieReviews.reviews;
export const getMovieReviewsStatus = (state: RootState) =>
  state.movieReviews.status;
export const getMovieReviewsError = (state: RootState) =>
  state.movieReviews.error;

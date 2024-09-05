import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { MediaItemType } from "@/types";

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async (params?:string) => {
    const data = await fetchData(`/movie/upcoming`,params);
    return data;
  }
);

interface UpcomingState {
  movies: {
    page: number;
    results: MediaItemType[];
    total_pages: number;
    total_results: number;
  } | null;
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

export const selectUpcomingMovies = (state: RootState) => state.upcoming.movies;
export const selectUpcomingStatus = (state: RootState) => state.upcoming.status;
export const selectUpcomingError = (state: RootState) => state.upcoming.error;

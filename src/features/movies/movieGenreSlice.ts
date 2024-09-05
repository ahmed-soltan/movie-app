import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { Genre } from "@/types";

export const fetchMoviesGenre = createAsyncThunk(
  "/moviesGenre/fetchMoviesGenre",
  async (params?: string) => {
    const data = await fetchData("/genre/movie/list", params);
    return data;
  }
);

export interface MoviesGenreState {
  moviesGenre: {
    genres: Genre[];
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: MoviesGenreState = {
  moviesGenre: null,
  status: "idle",
  error: null,
};

export const moviesGenreSlice = createSlice({
  name: "moviesGenre",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchMoviesGenre.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchMoviesGenre.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.moviesGenre = action.payload;
    });
    builder.addCase(fetchMoviesGenre.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = moviesGenreSlice.actions;

export default moviesGenreSlice.reducer;

export const getAllMoviesGenre = (state: RootState) =>
  state.moviesGenre.moviesGenre;
export const getMoviesGenreStatus = (state: RootState) =>
  state.moviesGenre.status;
export const getMoviesGenreError = (state: RootState) =>
  state.moviesGenre.error;

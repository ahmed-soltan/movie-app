import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { Movie } from "@/types";

export const searchMulti = createAsyncThunk(
  "search/searchMulti",
  async (query: string) => {
    const data = await fetchData(`/search/multi?query=${query}`);
    return data;
  }
);

export interface SearchState {
  searchResults: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: SearchState = {
  searchResults: [],
  status: "idle",
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(searchMulti.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(searchMulti.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.searchResults = action.payload.results;
    });
    builder.addCase(searchMulti.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {} = searchSlice.actions;

export default searchSlice.reducer;

export const getSearchResults = (state: RootState) => state.search.searchResults;
export const getSearchStatus = (state: RootState) => state.search.status;
export const getSearchError = (state: RootState) => state.search.error;

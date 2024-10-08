import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/store";
import { fetchData } from "@/utils/fetch-data";
import { MediaItemType } from "@/types";

export const searchMulti = createAsyncThunk(
  "search/searchMulti",
  async (query: string) => {
    const data = await fetchData(`/search/movie` , query);
    return data;
  }
);

export interface SearchState {
  searchResults: {
    page: number;
    results: MediaItemType[];
    total_pages: number;
    total_results: number;
  } | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: SearchState = {
  searchResults: null,
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
      state.searchResults = action.payload;
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

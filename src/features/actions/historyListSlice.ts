import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@/types";
import { RootState } from "@/store";
import { delay } from "@/utils/delay";
import { toast } from "@/components/ui/use-toast";

interface HistoryList {
  userId: string;
  movies: Movie[];
}

interface HistoryListState {
  historyList: HistoryList;
}

const initialState: HistoryListState = {
  historyList: JSON.parse(localStorage.getItem("historyList") || '{"userId": "", "movies": []}'),
};

export const historyListSlice = createSlice({
  name: "historyList",
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.historyList.userId = action.payload;
      localStorage.setItem("historyList", JSON.stringify(state.historyList));
    },
    addMovieToHistoryList(state, action: PayloadAction<Movie>) {
      delay(500).then(() => {
        state.historyList.movies.push(action.payload);
        localStorage.setItem("historyList", JSON.stringify(state.historyList));

        toast({
          title: "Added to History List",
          description: `${action.payload.title.substring(
            0,
            30
          )} has been added to History List`,
          variant: "success",
        });
      });
    },
    
    removeMovieFromHistoryList(state, action: PayloadAction<{ id: number }>) {
      delay(500).then(() => {
        state.historyList.movies = state.historyList.movies.filter(
          (movie) => movie.id !== action.payload.id
        );
        localStorage.setItem("historyList", JSON.stringify(state.historyList));

        toast({
          title: "Removed From History List",
          variant: "destructive",
        });
      });
    },
  },
});

export const { setUserId, addMovieToHistoryList, removeMovieFromHistoryList } = historyListSlice.actions;

export default historyListSlice.reducer;

export const getHistoryList = (state: RootState) => state.historyList.historyList;
export const getUserId = (state: RootState) => state

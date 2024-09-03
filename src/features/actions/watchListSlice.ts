import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@/types";
import { RootState } from "@/store";
import { delay } from "@/utils/delay";
import { toast } from "@/components/ui/use-toast";

interface WatchList {
  userId: string;
  movies: Movie[];
}

interface WatchListState {
  watchList: WatchList;
}

const initialState: WatchListState = {
  watchList: JSON.parse(localStorage.getItem("watchList") || '{"userId": "", "movies": []}'),
};

export const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.watchList.userId = action.payload;
      localStorage.setItem("watchList", JSON.stringify(state.watchList));
    },
    addMovieToWatchList(state, action: PayloadAction<Movie>) {
      delay(500).then(() => {
        state.watchList.movies.push(action.payload);
        localStorage.setItem("watchList", JSON.stringify(state.watchList));

        toast({
          title: "Added to Watch List",
          description: `${action.payload.title.substring(
            0,
            30
          )} has been added to Watch List`,
          variant: "success",
        });
      });
    },
    
    removeMovieFromWatchList(state, action: PayloadAction<{ id: number }>) {
      delay(500).then(() => {
        state.watchList.movies = state.watchList.movies.filter(
          (movie) => movie.id !== action.payload.id
        );
        localStorage.setItem("watchList", JSON.stringify(state.watchList));

        toast({
          title: "Removed from Watch List",
          variant: "destructive",
        });
      });
    },
  },
});

export const { setUserId, addMovieToWatchList, removeMovieFromWatchList } = watchListSlice.actions;

export default watchListSlice.reducer;

export const getWatchList = (state: RootState) => state.watchList.watchList;
export const getUserId = (state: RootState) => state.watchList.watchList.userId;
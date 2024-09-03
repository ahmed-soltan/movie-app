import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@/types";
import { RootState } from "@/store";
import { delay } from "@/utils/delay";
import { toast } from "@/components/ui/use-toast";

interface FavoriteList {
  userId: string;
  movies: Movie[];
}

interface FavoriteListState {
  favoriteList: FavoriteList;
}

const initialState: FavoriteListState = {
  favoriteList: JSON.parse(
    localStorage.getItem("favoriteList") || '{"userId": "", "movies": []}'
  ),
};

export const favoriteListSlice = createSlice({
  name: "favoriteList",
  initialState,
  reducers: {
    setUserId(state, action: PayloadAction<string>) {
      state.favoriteList.userId = action.payload;
      localStorage.setItem("favoriteList", JSON.stringify(state.favoriteList));
    },
    addMovieToFavoriteList(state, action: PayloadAction<Movie>) {
      delay(500).then(() => {
        state.favoriteList.movies.push(action.payload);
        localStorage.setItem(
          "favoriteList",
          JSON.stringify(state.favoriteList)
        );

        toast({
          title: "Added to Favorite List",
          description: `${action.payload.title.substring(
            0,
            30
          )} has been added to Favorite List`,
          variant: "success",
        });
      });
    },
    
    removeMovieFromFavoriteList(state, action: PayloadAction<{ id: number }>) {
      delay(500).then(() => {
        state.favoriteList.movies = state.favoriteList.movies.filter(
          (movie) => movie.id !== action.payload.id
        );
        localStorage.setItem(
          "favoriteList",
          JSON.stringify(state.favoriteList)
        );

        toast({
          title: "Removed From Favorite List",
          variant: "destructive",
        });
      });
    },
  },
});

export const {
  setUserId,
  addMovieToFavoriteList,
  removeMovieFromFavoriteList,
} = favoriteListSlice.actions;

export default favoriteListSlice.reducer;

export const getFavoriteList = (state: RootState) =>
  state.favoriteList.favoriteList;
export const getUserId = (state: RootState) =>
  state.favoriteList.favoriteList.userId;

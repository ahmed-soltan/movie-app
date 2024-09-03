import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import moviesSlice from "./features/movies/moviesSlice";
import favoriteListSlice from "./features/actions/favoriteListSlice";
import movieDetailsSlice from "./features/movies/movieDetailsSlice";
import movieRecommendationsSlice from "./features/movies/movieRecommendationSlice";
import movieReviewsSlice from "./features/movies/movieReviewsSlice";
import watchListSlice from "./features/actions/watchListSlice";
import historyListSlice from "./features/actions/historyListSlice";
import searchSlice from "./features/actions/searchSlice";
import seriesDetailsSlice from "./features/tv/seriesDetailsSlice";
import SeriesRecommendationsSlice from "./features/tv/seriesRecommendationSlice";
import seriesSlice from "./features/tv/seriesSlice";
import seriesReviewsSlice from "./features/tv/seriesReviewsSlice";
import nowPlayingMoviesSlice from "./features/movies/nowPlayingMoviesSlice";
import upcomingSlice from "./features/movies/upcomingSlice";
import topRatedSlice from "./features/movies/topRatedSlice";
import popularSlice from "./features/movies/popularSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesSlice,
    movieDetails: movieDetailsSlice,
    favoriteList: favoriteListSlice,
    movieRecommendations: movieRecommendationsSlice,
    movieReviews: movieReviewsSlice,
    watchList: watchListSlice,
    historyList: historyListSlice,
    search: searchSlice,
    series: seriesSlice,
    seriesDetails: seriesDetailsSlice,
    seriesRecommendations: SeriesRecommendationsSlice,
    seriesReviews:seriesReviewsSlice,
    nowPlayingMovies:nowPlayingMoviesSlice,
    upcoming:upcomingSlice,
    topRated:topRatedSlice,
    popular:popularSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

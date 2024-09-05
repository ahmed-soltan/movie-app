import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/user/userSlice";
import moviesSlice from "./features/movies/moviesSlice";
import movieRecommendationsSlice from "./features/movies/movieRecommendationSlice";
import movieReviewsSlice from "./features/movies/movieReviewsSlice";
import searchSlice from "./features/actions/searchSlice";
import seriesDetailsSlice from "./features/tv/seriesDetailsSlice";
import SeriesRecommendationsSlice from "./features/tv/seriesRecommendationSlice";
import seriesSlice from "./features/tv/seriesSlice";
import seriesReviewsSlice from "./features/tv/seriesReviewsSlice";
import nowPlayingMoviesSlice from "./features/movies/nowPlayingMoviesSlice";
import upcomingSlice from "./features/movies/upcomingSlice";
import topRatedSlice from "./features/movies/topRatedSlice";
import popularSlice from "./features/movies/popularSlice";
import videosSlice from "./features/actions/videosSlice";
import movieDetailsSlice from "./features/movies/movieDetailsSlice";
import seasonDetailsSlice from "./features/tv/seasonDetailsSlice";
import EpisodeDetailsSlice from "./features/tv/episodeDetailsSlice";
import moviesGenreSlice from "./features/movies/movieGenreSlice";
import seriesGenreSlice from "./features/tv/seriesGenreSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesSlice,
    movieRecommendations: movieRecommendationsSlice,
    movieReviews: movieReviewsSlice,
    search: searchSlice,
    series: seriesSlice,
    seriesDetails: seriesDetailsSlice,
    seriesRecommendations: SeriesRecommendationsSlice,
    seriesReviews: seriesReviewsSlice,
    nowPlayingMovies: nowPlayingMoviesSlice,
    upcoming: upcomingSlice,
    topRated: topRatedSlice,
    popular: popularSlice,
    videos: videosSlice,
    movieDetails: movieDetailsSlice,
    seasonDetails: seasonDetailsSlice,
    episodeDetails: EpisodeDetailsSlice,
    moviesGenre: moviesGenreSlice,
    seriesGenre: seriesGenreSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

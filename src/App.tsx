import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { store } from "./store";
import { Toaster } from "./components/ui/toaster";
import {
  GuardedRoute,
  ReverseGuardedRoute,
} from "./app/profile/middleware";

import HomePage from "./app/home/pages/homePage";
import MoviesPage from "./app/movies/pages/moviesPage";
import BaseLayout from "./layout/base-layout";
import ProfilePage from "./app/profile/pages/ProfilePage/ProfilePage";
import FavoriteListPage from "./app/profile/pages/FavoriteListPage/FavoriteListPage";
import WatchListPage from "./app/profile/pages/WatchListPage/WatchListPage";
import HistoryListPage from "./app/profile/pages/HistoryListPage/HistoryListPage";
import LoginPage from "./app/profile/pages/loginPage/LoginPage";
import RegisterPage from "./app/profile/pages/registerPage/RegisterPage";
import SeriesDetailsPage from "./app/tv/pages/SeriesDetailsPage/SeriesDetailsPage";
import SeriesPage from "./app/tv/pages/SeriesPage/SeriesPage";
import PlayingNowMoviesPage from "./app/movies/pages/PlayingNowMoviesPage/PlayingNowMoviesPage";
import MovieDetailsPage from "./app/movies/pages/MovieDetailsPage/MovieDetailsPage";
import PopularMoviesPage from "./app/movies/pages/PopularMoviesPage/PopularMoviesPage";
import TopRatedMoviesPage from "./app/movies/pages/TopRatedMoviesPage/TopRatedMoviesPage";
import UpComingMoviesPage from "./app/movies/pages/upcomingMoviesPage/UpComingMoviesPage";
import EpisodeDetailsPage from "./app/tv/pages/EpisodeDetailsPage/EpisodeDetailsPage";
import NotFoundPage from "./layout/not-found-page";
import ProfileLayout from "./layout/profile-layout/profile-layout";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
            <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
            <Route path="/movies/popular" element={<PopularMoviesPage />} />
            <Route path="/movies/upcoming" element={<UpComingMoviesPage />} />
            <Route
              path="/movies/playing-now"
              element={<PlayingNowMoviesPage />}
            />
            <Route path="/tv/series" element={<SeriesPage />} />
            <Route path="/tv/series/:id" element={<SeriesDetailsPage />} />
            <Route
              path="/tv/series/:id/season/:seasonNumber/episode/:episodeNumber"
              element={<EpisodeDetailsPage />}
            />
            <Route
              path="/profile/login"
              element={
                <ReverseGuardedRoute>
                  <LoginPage />
                </ReverseGuardedRoute>
              }
            />
            <Route
              path="/profile/register"
              element={
                <ReverseGuardedRoute>
                  <RegisterPage />
                </ReverseGuardedRoute>
              }
            />
            <Route path="*/*" element={<NotFoundPage />} />
            <Route
              path="/profile"
              element={
                <ProfileLayout>
                  <GuardedRoute>
                    <ProfilePage />
                  </GuardedRoute>
                </ProfileLayout>
              }
            />
            <Route
              path="/profile/favorite-list"
              element={
                <ProfileLayout>
                  <GuardedRoute>
                    <FavoriteListPage />
                  </GuardedRoute>
                </ProfileLayout>
              }
            />
            <Route
              path="/profile/watch-list"
              element={
                <ProfileLayout>
                  <GuardedRoute>
                    <WatchListPage />
                  </GuardedRoute>
                </ProfileLayout>
              }
            />
            <Route
              path="/profile/history-list"
              element={
                <ProfileLayout>
                  <GuardedRoute>
                    <HistoryListPage />
                  </GuardedRoute>
                </ProfileLayout>
              }
            />
          </Routes>
        </BaseLayout>
      </Router>
      <Toaster />
    </Provider>
  );
}

export default App;

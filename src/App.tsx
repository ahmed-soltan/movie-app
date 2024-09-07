import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { store } from "./store";
import { Toaster } from "./components/ui/toaster";
import {
  GuardedRoute,
  ReverseGuardedRoute,
} from "./front-office/profile/middleware";

import HomePage from "./front-office/home/pages/homePage";
import MoviesPage from "./front-office/movies/pages/moviesPage";
import BaseLayout from "./layout/base-layout";
import ProfilePage from "./front-office/profile/pages/ProfilePage/ProfilePage";
import FavoriteListPage from "./front-office/profile/pages/FavoriteListPage/FavoriteListPage";
import WatchListPage from "./front-office/profile/pages/WatchListPage/WatchListPage";
import HistoryListPage from "./front-office/profile/pages/HistoryListPage/HistoryListPage";
import LoginPage from "./front-office/profile/pages/loginPage/LoginPage";
import RegisterPage from "./front-office/profile/pages/registerPage/RegisterPage";
import SeriesDetailsPage from "./front-office/tv/pages/SeriesDetailsPage/SeriesDetailsPage";
import SeriesPage from "./front-office/tv/pages/SeriesPage/SeriesPage";
import PlayingNowMoviesPage from "./front-office/movies/pages/PlayingNowMoviesPage/PlayingNowMoviesPage";
import MovieDetailsPage from "./front-office/movies/pages/MovieDetailsPage/MovieDetailsPage";
import PopularMoviesPage from "./front-office/movies/pages/PopularMoviesPage/PopularMoviesPage";
import TopRatedMoviesPage from "./front-office/movies/pages/TopRatedMoviesPage/TopRatedMoviesPage";
import UpComingMoviesPage from "./front-office/movies/pages/upcomingMoviesPage/UpComingMoviesPage";
import EpisodeDetailsPage from "./front-office/tv/pages/EpisodeDetailsPage/EpisodeDetailsPage";
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

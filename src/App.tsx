import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { store } from "./store";
import { Toaster } from "./components/ui/toaster";
import { GuardedRoute } from "./components/GuardedRoute";
import { ReverseGuardedRoute } from "./components/ReverseGuardedRoute";

import HomePage from "./pages/home/pages/homePage";
import MoviesPage from "./pages/movies/pages/moviesPage";
import BaseLayout from "./layout/base-layout";
import ProfilePage from "./pages/profile/pages/ProfilePage";
import FavoriteListPage from "./pages/profile/pages/FavoriteListPage";
import WatchListPage from "./pages/profile/pages/WatchListPage";
import HistoryListPage from "./pages/profile/pages/HistoryListPage";
import LoginPage from "./pages/profile/pages/loginPage/LoginPage";
import RegisterPage from "./pages/profile/pages/registerPage/RegisterPage";
import SeriesDetailsPage from "./pages/tv/pages/SeriesDetailsPage/SeriesDetailsPage";
import SeriesPage from "./pages/tv/pages/SeriesPage/SeriesPage";
import PlayingNowMoviesPage from "./pages/movies/pages/PlayingNowMoviesPage/PlayingNowMoviesPage";
import MovieDetailsPage from "./pages/movies/pages/MovieDetailsPage/MovieDetailsPage";
import PopularMoviesPage from "./pages/movies/pages/PopularMoviesPage/PopularMoviesPage";
import TopRatedMoviesPage from "./pages/movies/pages/TopRatedMoviesPage/TopRatedMoviesPage";
import UpComingMoviesPage from "./pages/movies/pages/upcomingMoviesPage/UpComingMoviesPage";
import SeasonDetailsPage from "./pages/tv/pages/SeasonDetailsPage.tsx/SeasonDetailsPage";
import EpisodeDetailsPage from "./pages/tv/pages/EpisodeDetailsPage/EpisodeDetailsPage";

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
              path="/tv/series/:id/season/:seasonNumber"
              element={<SeasonDetailsPage />}
            />
            <Route
              path="/tv/series/:id/season/:seasonNumber/episode/:episodeNumber"
              element={<EpisodeDetailsPage />}
            />
            <Route
              path="/profile"
              element={
                <GuardedRoute>
                  <ProfilePage />
                </GuardedRoute>
              }
            />
            <Route
              path="/profile/favorite-list"
              element={
                <GuardedRoute>
                  <FavoriteListPage />
                </GuardedRoute>
              }
            />
            <Route
              path="/profile/watch-list"
              element={
                <GuardedRoute>
                  <WatchListPage />
                </GuardedRoute>
              }
            />
            <Route
              path="/profile/history-list"
              element={
                <GuardedRoute>
                  <HistoryListPage />
                </GuardedRoute>
              }
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
          </Routes>
        </BaseLayout>
      </Router>
      <Toaster />
    </Provider>
  );
}

export default App;

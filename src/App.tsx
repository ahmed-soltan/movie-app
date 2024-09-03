import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { store } from "./store";
import { Toaster } from "./components/ui/toaster";
import { GuardedRoute } from "./components/GuardedRoute";

import HomePage from "./pages/home/pages/homePage";
import MoviesPage from "./pages/movies/pages/moviesPage";
import BaseLayout from "./layout/base-layout";
import TopRatedPage from "./pages/topRated/pages/TopRatedPage";
import PopularPage from "./pages/popular/pages/PopularPage";
import ProfilePage from "./pages/profile/pages/ProfilePage";
import FavoriteListPage from "./pages/profile/pages/FavoriteListPage";
import WatchListPage from "./pages/profile/pages/WatchListPage";
import HistoryListPage from "./pages/profile/pages/HistoryListPage";
import { ReverseGuardedRoute } from "./components/ReverseGuardedRoute";
import LoginPage from "./pages/profile/pages/loginPage/LoginPage";
import RegisterPage from "./pages/profile/pages/registerPage/RegisterPage";
import MovieDetailsPage from "./pages/movies/pages/MovieDetailsPage";
import SeriesDetailsPage from "./pages/tv/pages/SeriesDetailsPage";
import SeriesPage from "./pages/tv/pages/SeriesPage";
import PlayingNowMoviesPage from "./pages/movies/pages/PlayingNowMoviesPage/PlayingNowMoviesPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:id" element={<MovieDetailsPage />} />
            <Route path="/tv" element={<SeriesPage />} />
            <Route path="/tv/:id" element={<SeriesDetailsPage />} />
            <Route path="/movies/top-rated" element={<TopRatedPage />} />
            <Route path="/movies/popular" element={<PopularPage />} />
            <Route path="/movies/playing-now" element={<PlayingNowMoviesPage />} />
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

import { useNowPlayingMovies } from "@/hooks/movies/use-now-playing-movies";
import { Banner } from "../components/banner";
import { usePopularMovies } from "@/hooks/movies/use-popular-movies";
import { useSeries } from "@/hooks/tv/use-series";
import { useUpcomingMovies } from "@/hooks/movies/use-upcoming-movies";
import { MediaSection } from "../components/media-section";

const HomePage = () => {
  const { data: playingNowMovies } = useNowPlayingMovies();
  const { data: popularMovies } = usePopularMovies();
  const { data: tvSeries } = useSeries();
  const { data: upComingMovies } = useUpcomingMovies();

  return (
    <div className="flex items-start flex-col gap-20 h-full px-3">
      <Banner />
      {playingNowMovies && (
        <MediaSection
          title="Now Playing Movies"
          data={playingNowMovies.results.slice(0, 12)}
          path="/movies/playing-now"
          basePath="/movies"
        />
      )}
      {popularMovies && (
        <MediaSection
          title="Popular Movies"
          data={popularMovies.results.slice(0, 12)}
          path="/movies/popular"
          basePath="/movies"
        />
      )}
      {tvSeries && (
        <MediaSection
          title="TV Series"
          data={tvSeries.results.slice(0, 12)}
          path="/tv/series"
          basePath="/tv/series"
        />
      )}
      {upComingMovies && (
        <MediaSection
          title="Upcoming Movies"
          data={upComingMovies.results.slice(0, 12)}
          path="/movies/upcoming"
          basePath="/movies"
        />
      )}
    </div>
  );
};

export default HomePage;

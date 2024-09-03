import { Banner } from "../components/banner";
import PlayingNowMovies from "../components/play-now-movies";
import PopularMovies from "../components/popular-movies";

const HomePage = () => {
  return <div className="flex items-start flex-col gap-20 h-full px-3">
    <Banner/>
    <PlayingNowMovies/>
    <PopularMovies/>
  </div>;
};

export default HomePage;

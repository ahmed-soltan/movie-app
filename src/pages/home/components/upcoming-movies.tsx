import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

import { MediaItemCard } from "@/components/cards/media-item-card";
import { useUpcomingMovies } from "@/hooks/movies/use-upcoming-movies";

const UpComingMovies = () => {
  const { data } = useUpcomingMovies();

  const UpComingMovies = data?.results && data?.results.slice(0, 12);

  if (!UpComingMovies) {
    return null;
  }

  return (
    <div className="flex items-start flex-col gap-5 w-full">
      <div className="flex items-center justify-between w-full my-2">
        <h1 className="text-2xl md:text-4xl text-white font-bold">
          UpComing Movies
        </h1>
        <Link
          className="text-[#a075dd] flex items-center text-base md:text-xl mt-1"
          to={"/movies/upcoming"}
        >
          <span className="hidden md:block mr-1">View </span> {" "} All
          <GoArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
        </Link>
      </div>
      <div
        className="flex items-center justify-between w-full overflow-x-auto gap-5"
        style={{ scrollbarWidth: "none" }}
      >
        {UpComingMovies.map((movie) => (
          <MediaItemCard key={movie.id} media={movie} path="/movies"/>
        ))}
      </div>
    </div>
  );
};

export default UpComingMovies;

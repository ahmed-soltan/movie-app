import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

import { MovieCard } from "@/components/cards/movie-card";
import { usePopularMovies } from "@/hooks/use-popular-movies";

const PopularMovies = () => {
  const { data } = usePopularMovies();

  const PopularMovies = data?.results && data?.results.slice(0, 12);

  if (!PopularMovies) {
    return null;
  }

  return (
    <div className="flex items-start flex-col gap-5 w-full">
      <div className="flex items-center justify-between w-full my-2">
        <h1 className="text-2xl md:text-4xl text-white font-bold">
          Popular Movies
        </h1>
        <Link
          className="text-[#a075dd] flex items-center text-base md:text-xl mt-1"
          to={"/movies/popular"}
        >
          <span className="hidden md:block mr-1">View </span> {" "} All
          <GoArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-1" />
        </Link>
      </div>
      <div
        className="flex items-center justify-between w-full overflow-x-auto gap-5"
        style={{ scrollbarWidth: "none" }}
      >
        {PopularMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;

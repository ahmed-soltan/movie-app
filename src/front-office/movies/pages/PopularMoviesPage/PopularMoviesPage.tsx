import MovieList from "@/components/movie-list";
import { usePopularMovies } from "@/hooks/movies/use-popular-movies";
import { useState } from "react";

const TopRatedMoviesPage = () => {
  const [params, setParams] = useState("");

  const handleGetPageNumber = (params: string) => {
    setParams(params);
  };

  const { data } = usePopularMovies(params);
  return (
    <MovieList
      fetchMovies={() => ({ data })}
      title="Popular Movies"
      handleGetPageNumber={handleGetPageNumber}
      path="/movies"
    />
  );
};

export default TopRatedMoviesPage;

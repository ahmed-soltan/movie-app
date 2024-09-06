import MovieList from "@/components/movie-list";
import { useTopRatedMovies } from "@/hooks/movies/use-top-rated-movies";
import { useState } from "react";

const TopRatedMoviesPage = () => {
  const [params, setParams] = useState("");

  const handleGetPageNumber = (params: string) => {
    setParams(params);
  };

  const { movies } = useTopRatedMovies(params);
  return (
    <MovieList
      fetchMovies={() => ({ data: movies })}
      title="Top Rated Movies"
      handleGetPageNumber={handleGetPageNumber}
      path="/movie"
    />
  );
};

export default TopRatedMoviesPage;

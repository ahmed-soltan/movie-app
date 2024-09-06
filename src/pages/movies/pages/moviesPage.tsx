import MovieList from "@/components/movie-list";
import { useMovies } from "@/hooks/movies/use-movies";
import { useState } from "react";

const MoviesPage = () => {
  const [params, setParams] = useState("");

  const handleGetPageNumber = (params: string) => {
    setParams(params);
  };

  const { data } = useMovies(params);

  return (
    <MovieList
      fetchMovies={() => ({ data })}
      title="Movies"
      handleGetPageNumber={handleGetPageNumber}
      path="/movie"
    />
  );
};

export default MoviesPage;

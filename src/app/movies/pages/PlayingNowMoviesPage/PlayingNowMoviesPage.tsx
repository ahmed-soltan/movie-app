import MovieList from "@/components/movie-list";
import { useNowPlayingMovies } from "@/hooks/movies/use-now-playing-movies";
import { useState } from "react";

const TopRatedMoviesPage = () => {
  const [params, setParams] = useState("");

  const handleGetPageNumber = (params: string) => {
    setParams(params);
  };

  const { data } = useNowPlayingMovies(params);
  return (
    <MovieList
      fetchMovies={() => ({ data })}
      title="playing Now Movies"
      handleGetPageNumber={handleGetPageNumber}
      path="/movies"
    />
  );
};

export default TopRatedMoviesPage;

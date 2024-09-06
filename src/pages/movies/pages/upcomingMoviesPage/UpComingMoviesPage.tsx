import MovieList from "@/components/movie-list";
import { useUpcomingMovies } from "@/hooks/movies/use-upcoming-movies";
import { useState } from "react";

const UpComingMoviesPage = () => {
  const [params, setParams] = useState("");

  const handleGetPageNumber = (params: string) => {
    setParams(params);
  };

  const { data } = useUpcomingMovies(params);
  return (
    <MovieList
      fetchMovies={() => ({ data })}
      title="Upcoming Movies"
      handleGetPageNumber={handleGetPageNumber}
      path="/movie"
    />
  );
};

export default UpComingMoviesPage;

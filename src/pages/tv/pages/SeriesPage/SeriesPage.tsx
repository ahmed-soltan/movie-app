import MovieList from "@/components/movie-list";
import { useSeries } from "@/hooks/tv/use-series";
import { useState } from "react";

const TopRatedMoviesPage = () => {
  const [params, setParams] = useState("");

  const handleGetPageNumber = (params: string) => {
    setParams(params);
  };

  const { data } = useSeries(params);
  return (
    <MovieList
      fetchMovies={() => ({ data })}
      title="Tv Series"
      handleGetPageNumber={handleGetPageNumber}
      path="/tv/series"
    />
  );
};

export default TopRatedMoviesPage;

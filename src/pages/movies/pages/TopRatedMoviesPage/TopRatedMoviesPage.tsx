import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";

import { MediaItemCard } from "@/components/cards/media-item-card";
import { Button } from "@/components/ui/button";
import { getPageNumbers } from "@/utils/get-pages";
import { useTopRatedMovies } from "@/hooks/movies/use-top-rated-movies";
import usePagination from "@/hooks/use-pagination";

const TopRatedMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = parseInt(searchParams.get("page") || "1");
  const { page, nextPage, prevPage, setPage } = usePagination(pageFromUrl);

  const params = queryString.stringify({ page });
  const { movies } = useTopRatedMovies(params);

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page, setSearchParams]);

  if (!movies) {
    return null;
  }

  const totalPages = movies?.total_pages || 1;
  const maxVisiblePages = 6;

  const pageNumbers = getPageNumbers(page, maxVisiblePages,totalPages);

  return (
    <div className="flex flex-col items-start gap-5 p-5">
      <h1 className="text-2xl md:text-4xl text-white font-bold">
        <span className="text-[#5a2e98]">Top Rated </span>
        Movies
      </h1>
      <div className="flex items-start gap-6 flex-wrap justify-center lg:justify-start">
        {movies?.results.map((result) => (
          <MediaItemCard key={result.id} media={result} path="/movies"/>
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 text-white mt-4 w-full">
        <Button
          variant={"primary"}
          onClick={prevPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        {pageNumbers.map((pageNumber, index) => (
          <Button
            key={index}
            onClick={() =>
              typeof pageNumber === "number" && setPage(pageNumber)
            }
            disabled={typeof pageNumber !== "number"}
            variant={pageNumber === page ? "primary" : "default"}
          >
            {pageNumber}
          </Button>
        ))}
        <Button
          variant={"primary"}
          onClick={nextPage}
          disabled={totalPages <= page}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TopRatedMoviesPage;

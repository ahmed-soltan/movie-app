import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";

import { MediaItemCard } from "@/components/cards/media-item-card";
import { Button } from "@/components/ui/button";
import { getPageNumbers } from "@/utils/get-pages";
import usePagination from "@/hooks/use-pagination";
import Genres from "@/components/genres";
import { filterMediaByGenre } from "@/utils/filter-media-by-genre";

interface MovieListProps {
  fetchMovies: () => { data: any };
  handleGetPageNumber: (params: string) => void;
  title: string;
  path:"/movie"|"/tv/series"
}

const MovieList = ({
  fetchMovies,
  title,
  handleGetPageNumber,
  path
}: MovieListProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const { page, nextPage, prevPage, setPage } = usePagination(pageFromUrl);
  
  const params = queryString.stringify({ page });
  
  const { data } = fetchMovies();

  useEffect(() => {
    if (selectedGenre && data) {
      setFilteredData(filterMediaByGenre(selectedGenre, data.results));
    } else if (data) {
      setFilteredData(data.results);
    }
  }, [selectedGenre, data]);
  
  useEffect(() => {
    setSearchParams({ page: page.toString() });
    handleGetPageNumber(params);
  }, [page, setSearchParams]);

  if (!data) {
    return null;
  }

  const totalPages = data.total_pages || 1;
  const maxVisiblePages = 6;
  const pageNumbers = getPageNumbers(page, maxVisiblePages, totalPages);

  const selectGenre = (genreId: string) => {
    setSelectedGenre(genreId);
  };

  return (
    <div className="flex flex-col items-start gap-5 p-5">
      <div className="flex items-center justify-between w-full flex-wrap md:flex-nowrap gap-5">
        <h1 className="text-2xl md:text-4xl text-white font-bold">
            {title}
        </h1>
        <Genres selectGenre={selectGenre} />
      </div>
      <div className="flex items-start gap-6 flex-wrap justify-center lg:justify-start">
        {filteredData.map((result) => (
          <MediaItemCard key={result.id} media={result} path={path} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 text-white mt-4 w-full">
        <Button variant={"primary"} onClick={prevPage} disabled={page === 1}>
          Previous
        </Button>
        <div
          className="w-[300px] md:w-[470px] overflow-x-auto flex items-center gap-1"
          style={{ scrollbarWidth: "none" }}
        >
          {pageNumbers.map((pageNumber, index) => (
            <Button
              key={index}
              onClick={() =>
                typeof pageNumber === "number" && setPage(pageNumber)
              }
              className="w-14"
              disabled={typeof pageNumber !== "number"}
              variant={pageNumber === page ? "primary" : "default"}
            >
              {pageNumber}
            </Button>
          ))}
        </div>
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

export default MovieList;

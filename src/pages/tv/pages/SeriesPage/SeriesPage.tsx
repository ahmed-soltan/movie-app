import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";

import { MediaItemCard } from "@/components/cards/media-item-card";
import usePagination from "@/hooks/use-pagination";
import { Button } from "@/components/ui/button";
import { getPageNumbers } from "@/utils/get-pages";
import { useSeries } from "@/hooks/tv/use-series";
import Genres from "@/components/genres";
import { filterMediaByGenre } from "@/utils/filter-media-by-genre";
import { useSeriesGenres } from "@/hooks/tv/use-series-genres";

const SeriesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const pageFromUrl = parseInt(searchParams.get("page") || "1");
  const { page, nextPage, prevPage, setPage } = usePagination(pageFromUrl);

  const { data: genres } = useSeriesGenres();

  const params = queryString.stringify({ page });
  const { data } = useSeries(params);

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page, setSearchParams]);

  useEffect(() => {
    if (selectedGenre && data) {
      setFilteredData(filterMediaByGenre(selectedGenre, data.results));
    } else if (data) {
      setFilteredData(data.results);
    }
  }, [selectedGenre, data]);

  if (!data) {
    return null;
  }

  const totalPages = data?.total_pages || 1;
  const maxVisiblePages = 6;

  const pageNumbers = getPageNumbers(page, maxVisiblePages, totalPages);

  const selectGenre = (genre: string) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="flex flex-col items-start gap-5 p-5">
      <div className="flex items-center justify-between w-full flex-wrap md:flex-nowrap gap-5">
        <h1 className="text-2xl md:text-4xl text-white font-bold">
          TV <span className="text-[#5a2e98]">Series</span>
        </h1>
        <Genres selectGenre={selectGenre} genres={genres!} />
      </div>
      <div className="flex items-start gap-6 flex-wrap justify-center lg:justify-start">
        {filteredData.map((result) => (
          <MediaItemCard key={result.id} media={result} path="/tv/series" />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2 text-white mt-4 w-full">
        <Button variant={"primary"} onClick={prevPage} disabled={page === 1}>
          Previous
        </Button>
        <div className="w-[250px] flex items-center overflow-x-auto gap-1 md:w-[380px]">
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

export default SeriesPage;

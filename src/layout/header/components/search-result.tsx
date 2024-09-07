import queryString from "query-string";
import { FiX } from "react-icons/fi";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useSearch } from "@/hooks/use-search";
import { baseImageUrl } from "@/shared/flags";

type SearchResultProps = {
  value?: string;
  OnClose?: () => void;
};

export default function SearchResult({ value, OnClose }: SearchResultProps) {
  const params = queryString.stringify({ query: value });
  const { searchResults } = useSearch(params);

  return (
    <ScrollArea className="w-full h-[380px] bg-[#1c1c1c] border-none outline-none rounded-md">
      <div className="flex flex-col items-start gap-5 py-5 px-4 md:px-7 relative">
        <FiX
          className="w-5 h-5 absolute top-2 right-2 cursor-pointer text-[#777]"
          onClick={OnClose}
        />
        {/* Display search results here */}
        {searchResults && searchResults.results.length > 0 ? (
          searchResults.results.map((result) => (
            <a
              href={`/movies/${result.id}`}
              key={result.id}
              className="flex items-center gap-2 text-white"
            >
              <img
                src={`${baseImageUrl}${result.poster_path}`}
                alt={result.original_title}
                className="w-16 h-16"
              />
              <div className="flex flex-col items-start gap-1">
                <h1 className="text-[#cacaca]">
                  {result.original_title || result.original_title}
                </h1>
                <div className="flex items-center gap-1 text-sm text-[#888]">
                  <span>{result.vote_average.toFixed(2)}</span>
                  <span>/10</span>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p className="text-[#999]">No results found</p>
        )}
      </div>
    </ScrollArea>
  );
}

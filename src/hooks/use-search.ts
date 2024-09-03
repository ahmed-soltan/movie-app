// src/hooks/useSearch.ts

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store";
import { toast } from "@/components/ui/use-toast";
import {
  searchMulti,
  getSearchResults,
  getSearchStatus,
  getSearchError,
} from "@/features/actions/searchSlice";
import { debounce } from "@/utils/debounce";

export const useSearch = (query: string) => {
  const searchResults = useSelector(getSearchResults);
  const status = useSelector(getSearchStatus);
  const error = useSelector(getSearchError);

  const dispatch = useDispatch<AppDispatch>();

  const debouncedSearch = debounce((query: string) => {
    if (query) {
      dispatch(searchMulti(query));
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  useEffect(() => {
    if (status === "failed" && error) {
      toast({
        title: "Search Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [status, error]);

  return {
    searchResults,
    status,
  };
};

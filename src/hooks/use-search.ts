import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch } from "@/store";
import { toast } from "@/components/ui/use-toast";
import {
  searchMulti,
  getSearchResults,
  getSearchStatus,
  getSearchError,
} from "@/features/actions/searchSlice";

export const useSearch = (query: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const searchResults = useSelector(getSearchResults);
  const status = useSelector(getSearchStatus);
  const error = useSelector(getSearchError);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      dispatch(searchMulti(debouncedQuery));
    }
  }, [debouncedQuery, dispatch]);

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

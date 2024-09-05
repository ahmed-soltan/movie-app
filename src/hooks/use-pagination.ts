import { useState } from "react";

const usePagination = (initialPage: number = 1) => {
  const [page, setPage] = useState(initialPage);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : prev));
  const resetPage = () => setPage(initialPage);

  return {
    page,
    nextPage,
    prevPage,
    resetPage,
    setPage
  };
};

export default usePagination;

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

interface PaginationProps {
  useDataHook: (params: string) => { data: any | null; loading: boolean };
  maxVisiblePages?: number;
  fetchParams?: Record<string, any>;
  component: React.ComponentType<any>;
}

const Pagination =({
  useDataHook,
  maxVisiblePages = 6,
  fetchParams = {},
  component: Component
}: PaginationProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get("page") || "1", 10);
  const params = new URLSearchParams({ ...fetchParams, page: currentPage.toString() }).toString();
  const { data, loading } = useDataHook(params);

  const totalPages = data?.total_pages || 1;

  useEffect(() => {
    if (loading) return;
    // Sync page number with URL if necessary
    navigate(`?${params}`);
  }, [currentPage, params, loading, navigate]);

  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-start gap-5 p-5">
      <div className="flex items-start gap-6 flex-wrap justify-center lg:justify-start">
        {data && <Component data={data} />}
      </div>
      <div className="flex items-center justify-center gap-2 text-white mt-4 w-full">
        <Button
          variant={"primary"}
          onClick={() => navigate(`?page=${Math.max(currentPage - 1, 1)}`)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {pageNumbers.map((pageNumber, index) => (
          <Button
            key={index}
            onClick={() =>
              typeof pageNumber === "number" && navigate(`?page=${pageNumber}`)
            }
            disabled={typeof pageNumber !== "number"}
            variant={pageNumber === currentPage ? "primary" : "default"}
          >
            {pageNumber}
          </Button>
        ))}
        <Button
          variant={"secondary"}
          onClick={() => navigate(`?page=${Math.min(currentPage + 1, totalPages)}`)}
          disabled={totalPages <= currentPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;

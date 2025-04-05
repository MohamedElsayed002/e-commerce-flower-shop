"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange = () => {},
  className,
}: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePrevious = () => {
    if (!isFirstPage && typeof onPageChange === "function") {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isLastPage && typeof onPageChange === "function") {
      onPageChange(currentPage + 1);
    }
  };

  const paginationItems = useMemo(() => {
    const items = [];

    // Always show first page
    items.push({
      page: 1,
      isCurrent: currentPage === 1,
      isEllipsis: false,
    });

    // Previous page (if not first or adjacent to first)
    if (currentPage > 3) {
      items.push({
        page: null,
        isCurrent: false,
        isEllipsis: true,
      });
    }

    // One page before current (if not first)
    if (currentPage > 2) {
      items.push({
        page: currentPage - 1,
        isCurrent: false,
        isEllipsis: false,
      });
    }

    // Current page (if not first)
    if (currentPage !== 1 && currentPage !== totalPages) {
      items.push({
        page: currentPage,
        isCurrent: true,
        isEllipsis: false,
      });
    }

    // One page after current (if not last)
    if (currentPage < totalPages - 1) {
      items.push({
        page: currentPage + 1,
        isCurrent: false,
        isEllipsis: false,
      });
    }

    // Ellipsis before last page (if needed)
    if (currentPage < totalPages - 2) {
      items.push({
        page: null,
        isCurrent: false,
        isEllipsis: true,
      });
    }

    // Always show last page (if not first page)
    if (totalPages > 1) {
      items.push({
        page: totalPages,
        isCurrent: currentPage === totalPages,
        isEllipsis: false,
      });
    }

    return items;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className={cn("flex items-center justify-center space-x-2", className)}
      aria-label="Pagination"
    >
      <button
        onClick={handlePrevious}
        disabled={isFirstPage}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          isFirstPage
            ? "cursor-not-allowed bg-gray-200 text-gray-500"
            : "bg-[#1a1a3a] text-white hover:bg-[#2a2a4a]",
        )}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {paginationItems.map((item, index) => {
        if (item.isEllipsis) {
          return (
            <div
              key={`ellipsis-${index}`}
              className="flex h-10 w-10 items-center justify-center text-sm font-medium"
            >
              <span className="text-gray-700">...</span>
            </div>
          );
        }

        return (
          <button
            key={`page-${item.page}`}
            onClick={() => typeof onPageChange === "function" && onPageChange(item.page)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
              item.isCurrent
                ? "bg-[#ff3b8b] text-white"
                : "bg-[#1a1a3a] text-white hover:bg-[#2a2a4a]",
            )}
            aria-current={item.isCurrent ? "page" : undefined}
          >
            {item.page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={isLastPage}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          isLastPage
            ? "cursor-not-allowed bg-gray-200 text-gray-500"
            : "bg-[#1a1a3a] text-white hover:bg-[#2a2a4a]",
        )}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </nav>
  );
}

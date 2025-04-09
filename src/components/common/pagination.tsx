"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ArrowLeftGo from "@/components/common/go-arrow-left";
import ArrowRightGo from "@/components/common/go-arrow-right";

type PagePaginationProps = {
  metadata?: Metadata;
};

export default function PagePagination({ metadata }: PagePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!metadata) return null;

  const currentPage = metadata.currentPage;
  const totalPages = metadata.totalPages;

  const queryString = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  // Function to navigate to a new page
  const navigateToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return;

      queryString.set("page", page.toString());
      router.push(`${pathname}?${queryString.toString()}`);
    },
    [queryString, pathname, router, currentPage, totalPages],
  );

  // Generates an array of page numbers and ellipsis elements
  const generatePages = (): (number | JSX.Element)[] => {
    const pages: (number | JSX.Element)[] = [];

    // If total pages are 3 or fewer, display all pages
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      // Show leading dots if current page is beyond page 3
      if (currentPage > 3) {
        pages.push(<HiOutlineDotsHorizontal />);
      }

      // Center current page with one before/after
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      // Add the middle page numbers
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Show trailing dots if current page is not close to the end
      if (currentPage < totalPages - 2) {
        pages.push(<HiOutlineDotsHorizontal />);
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Pagination className="flex items-center justify-center">
      <PaginationContent>
        {/* Previous button */}
        <PaginationItem>
          <button
            onClick={() => navigateToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-full flex items-center justify-center w-10 h-10  ${
              currentPage === 1
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-gray-900 text-white"
            }`}
          >
            {/* Icon */}
            <ArrowLeftGo />
          </button>
        </PaginationItem>

        {/* Numbered pages */}
        {generatePages().map((page, idx) =>
          typeof page === "number" ? (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage(page);
                }}
                className={`rounded-full w-10 h-10 flex items-center justify-center ${
                  page === currentPage
                    ? "bg-custom-rose-900 text-white"
                    : "bg-blue-gray-900 text-white"
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem key={`ellipsis-${idx}`}>
              {/* Icon dots */}
              <div className="w-10 h-10 rounded-full bg-blue-gray-900 text-white flex items-center justify-center">
                <HiOutlineDotsHorizontal className="w-5 h-5" />
              </div>
            </PaginationItem>
          ),
        )}

        {/* Next button*/}
        <PaginationItem>
          <button
            onClick={() => navigateToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded-full flex items-center justify-center w-10 h-10  ${
              currentPage === totalPages
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-gray-900  text-white"
            }`}
          >
            {/* Icon */}
            <ArrowRightGo />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

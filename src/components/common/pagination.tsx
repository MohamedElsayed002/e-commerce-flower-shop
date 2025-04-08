"use client";

// import { useMemo } from "react";
// import { cn } from "@/lib/utils";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import { GoArrowRight } from "react-icons/go";
// import { GoArrowLeft } from "react-icons/go";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange?: (page: number) => void;
//   className?: string;
// }

// export default function Pagination({
//   currentPage,
//   totalPages,
//   onPageChange = () => {},
//   className,
// }: PaginationProps) {
//   const isFirstPage = currentPage === 1;
//   const isLastPage = currentPage === totalPages;

//   const goToPage = (page: number) => {
//     if (page !== currentPage && page >= 1 && page <= totalPages) {
//       onPageChange(page);
//     }
//   };

//   const paginationItems = useMemo(() => {
//     const pages: (number | JSX.Element)[] = [];

//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       pages.push(1);

//       if (currentPage > 3) {
//         pages.push(<HiOutlineDotsHorizontal />);
//       }

//       const start = Math.max(2, currentPage - 1);
//       const end = Math.min(totalPages - 1, currentPage + 1);

//       for (let i = start; i <= end; i++) {
//         pages.push(i);
//       }

//       if (currentPage < totalPages - 2) {
//         pages.push(<HiOutlineDotsHorizontal />);
//       }

//       pages.push(totalPages);
//     }

//     return pages;
//   }, [currentPage, totalPages]);

//   if (totalPages <= 1) return null;

//   return (
//     <nav
//       className={cn("flex items-center justify-center space-x-2", className)}
//       aria-label="Pagination"
//     >
//       {/* Previous */}
//       <button
//         onClick={() => goToPage(currentPage - 1)}
//         disabled={isFirstPage}
//         className={cn(
//           "flex h-10 w-10 items-center justify-center rounded-full",
//           isFirstPage
//             ? "cursor-not-allowed bg-gray-200 text-gray-500"
//             : "bg-blue-gray-900 text-white",
//         )}
//         aria-label="Previous page"
//       >
//         <GoArrowLeft />
//       </button>

//       {/* Page Items */}
//       {paginationItems.map((item, index) =>
//         item === <HiOutlineDotsHorizontal /> ? (
//           <div
//             key={`ellipsis-${index}`}
//             className="flex h-10 w-10 items-center justify-center text-sm text-gray-600"
//           >
//             <HiOutlineDotsHorizontal />
//           </div>
//         ) : (
//           <button
//             key={`page-${item}`}
//             onClick={() => goToPage(item)}
//             className={cn(
//               "flex h-10 w-10 items-center justify-center rounded-full text-sm",
//               item === currentPage
//                 ? "bg-custom-rose-900 text-white"
//                 : "bg-blue-gray-900 text-white",
//             )}
//             aria-current={item === currentPage ? "page" : undefined}
//           >
//             {item}
//           </button>
//         ),
//       )}

//       {/* Next */}
//       <button
//         onClick={() => goToPage(currentPage + 1)}
//         disabled={isLastPage}
//         className={cn(
//           "flex h-10 w-10 items-center justify-center rounded-full",
//           isLastPage
//             ? "cursor-not-allowed bg-gray-200 text-gray-500"
//             : "bg-blue-gray-900 text-white",
//         )}
//         aria-label="Next page"
//       >
//         <GoArrowRight />
//       </button>
//     </nav>
//   );
// }
"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

type PagePaginationProps = {
  metadata: Metadata;
  className?: string;
};

export default function PagePagination({ metadata, className }: PagePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = metadata.currentPage;
  const totalPages = metadata.totalPages;

  const queryString = useMemo(() => new URLSearchParams(searchParams.toString()), [searchParams]);

  const navigateToPage = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) return;

      queryString.set("page", page.toString());
      router.push(`${pathname}?${queryString.toString()}`);
    },
    [queryString, pathname, router, currentPage, totalPages],
  );

  const generatePages = (): (number | JSX.Element)[] => {
    const pages: (number | JSX.Element)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push(<HiOutlineDotsHorizontal />);
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push(<HiOutlineDotsHorizontal />);
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateToPage(currentPage - 1);
            }}
            className="bg-[#140046] text-white rounded-full  flex items-center justify-center"
          />
        </PaginationItem>

        {/* Numbered Pages */}
        {generatePages().map((page, idx) =>
          typeof page === "number" ? (
            <PaginationItem key={`ellipsis-${idx}`}>
              <PaginationEllipsis className="text-white bg-[#140046] rounded-full flex items-center justify-center" />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage(page);
                }}
                className={`rounded-full  flex items-center justify-center ${
                  page === currentPage ? "bg-[#ff00b7] text-white" : "bg-[#140046] text-white"
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigateToPage(currentPage + 1);
            }}
            className="bg-[#140046] text-white rounded-full w-10 h-10 flex items-center justify-center"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

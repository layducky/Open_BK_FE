import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/** Sinh danh sách trang kiểu: 1, ..., 6, 7, 8, 9, 10, ..., 1000 */
function getPageItems(
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: (number | "ellipsis")[] = [];
  const windowSize = 2; // số trang mỗi bên của trang hiện tại
  const start = Math.max(2, currentPage - windowSize);
  const end = Math.min(totalPages - 1, currentPage + windowSize);

  items.push(1);

  if (start > 2) {
    items.push("ellipsis");
  }

  for (let i = start; i <= end; i++) {
    if (i !== 1 && i !== totalPages) {
      items.push(i);
    }
  }

  if (end < totalPages - 1) {
    items.push("ellipsis");
  }

  if (totalPages > 1) {
    items.push(totalPages);
  }

  return items;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageItems = getPageItems(currentPage, totalPages);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex justify-center items-center gap-1 mt-8">
      {/* << Trang đầu */}
      <button
        onClick={() => onPageChange(1)}
        disabled={!canGoPrev}
        aria-label="Trang đầu"
        className="px-3 py-2 rounded-md border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors text-sm font-medium"
      >
        &lt;&lt;
      </button>

      {/* < Trang trước */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        aria-label="Trang trước"
        className="px-3 py-2 rounded-md border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors text-sm font-medium"
      >
        &lt;
      </button>

      {/* Các số trang */}
      <div className="flex items-center gap-1 mx-2">
        {pageItems.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 py-2 text-gray-500 select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange(item)}
              className={`min-w-[2.25rem] px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === item
                  ? "bg-blue-500 text-white border border-blue-500"
                  : "border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          )
        )}
      </div>

      {/* > Trang sau */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        aria-label="Trang sau"
        className="px-3 py-2 rounded-md border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors text-sm font-medium"
      >
        &gt;
      </button>

      {/* >> Trang cuối */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={!canGoNext}
        aria-label="Trang cuối"
        className="px-3 py-2 rounded-md border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors text-sm font-medium"
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;

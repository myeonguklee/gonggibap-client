import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  selectedRestaurantId?: number | null;
  onRestaurantSelect?: (id: number | null) => void;
};

export const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  selectedRestaurantId,
  onRestaurantSelect,
}: PaginationProps) => {
  const displayPage = currentPage + 1;

  const handlePageChange = (newPage: number) => {
    if (selectedRestaurantId !== null && onRestaurantSelect) {
      onRestaurantSelect(null);
    }
    onPageChange(newPage - 1);
  };

  const getPageRange = () => {
    const pageSize = 5; // 한 번에 보여줄 페이지 수
    let start = Math.max(1, displayPage - Math.floor(pageSize / 2));
    let end = Math.min(start + pageSize - 1, totalPages);

    // 끝 부분에 도달했을 때 시작점 조정
    if (end === totalPages) {
      start = Math.max(1, end - pageSize + 1);
    }

    // 시작 부분에서는 기본 pageSize만큼 표시
    if (start === 1) {
      end = Math.min(pageSize, totalPages);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageRange();
  const isFirstPage = displayPage === 1;
  const isLastPage = displayPage === totalPages;

  return (
    <div className="mt-4 flex items-center justify-center gap-2">
      <button
        onClick={() => handlePageChange(displayPage - 1)}
        disabled={isFirstPage}
        className="rounded-lg p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
        aria-label="이전 페이지">
        <ChevronLeft size={20} />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`size-10 rounded-lg ${
            displayPage === page
              ? 'bg-[#FF7058] text-white'
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-current={displayPage === page ? 'page' : undefined}>
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(displayPage + 1)}
        disabled={isLastPage}
        className="rounded-lg p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
        aria-label="다음 페이지">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
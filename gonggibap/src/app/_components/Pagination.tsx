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
  // 화면에 표시될 페이지 번호 (0을 1로 표시)
  const displayPage = currentPage + 1;

  const handlePageChange = (newPage: number) => {
    // selectedRestaurantId가 존재할 경우 null로 초기화
    if (selectedRestaurantId !== null && onRestaurantSelect) {
      onRestaurantSelect(null);
    }
    // 페이지 번호를 0-based index로 변환하여 전달
    onPageChange(newPage - 1);
  };

  // 현재 페이지 그룹의 시작과 끝 페이지 계산
  const getPageRange = () => {
    const pageSize = 5; // 한 번에 보여줄 페이지 수
    const currentGroup = Math.floor((displayPage - 1) / pageSize);
    let start = currentGroup * pageSize + 1;
    let end = Math.min(start + pageSize - 1, totalPages);

    // 현재 페이지가 마지막 그룹에 있을 때 조정
    if (displayPage > totalPages - pageSize) {
      start = Math.max(totalPages - pageSize + 1, 1);
      end = totalPages;
    }

    // 현재 페이지가 첫 그룹에 있을 때 조정
    if (displayPage <= pageSize) {
      start = 1;
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

      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="size-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            1
          </button>
          {pageNumbers[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

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

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="size-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            {totalPages}
          </button>
        </>
      )}

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

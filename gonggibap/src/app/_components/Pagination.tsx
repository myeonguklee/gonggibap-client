import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
  // 현재 페이지 그룹의 시작과 끝 페이지 계산
  const getPageRange = () => {
    const pageSize = 5; // 한 번에 보여줄 페이지 수
    const currentGroup = Math.floor((currentPage - 1) / pageSize);
    let start = currentGroup * pageSize + 1;
    let end = Math.min(start + pageSize - 1, totalPages);

    // 현재 페이지가 마지막 그룹에 있을 때 조정
    if (currentPage > totalPages - pageSize) {
      start = Math.max(totalPages - pageSize + 1, 1);
      end = totalPages;
    }

    // 현재 페이지가 첫 그룹에 있을 때 조정
    if (currentPage <= pageSize) {
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
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirstPage}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="이전 페이지"
      >
        <ChevronLeft size={20} />
      </button>

      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            1
          </button>
          {pageNumbers[0] > 2 && (
            <span className="px-2">...</span>
          )}
        </>
      )}

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-lg ${
            currentPage === page 
              ? 'bg-[#FF7058] text-white' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLastPage}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="다음 페이지"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
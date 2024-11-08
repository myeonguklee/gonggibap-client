export const getVisiblePageNumbers = (
  currentPage: number, 
  totalPages: number, 
  maxVisible: number = 5
) => {
  const half = Math.floor(maxVisible / 2);
  let start = currentPage - half;
  let end = currentPage + half;

  if (start < 0) {
    end += Math.abs(start);
    start = 0;
  }

  if (end >= totalPages) {
    start -= (end - totalPages + 1);
    end = totalPages - 1;
  }

  start = Math.max(0, start);
  end = Math.min(totalPages - 1, end);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
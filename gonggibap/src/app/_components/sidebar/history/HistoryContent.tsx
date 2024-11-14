import { useEffect, useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

import { MapPinLoading } from '@/app/_components/MapPinLoading';
import { Pagination } from '@/app/_components/Pagination';

import { useGetHistories } from '@/apis/history';

interface HistoryContentProps {
  restaurantId: number;
  onMoveNav: () => void;
}

export function HistoryContent({
  restaurantId,
  onMoveNav,
}: HistoryContentProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const { data: histories, isLoading } = useGetHistories(
    restaurantId,
    currentPage,
  );

  const handleHistoryPageChange = (page: number) => {
    setCurrentPage(page);
    onMoveNav();
  };

  const toggleDetails = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  // restaurantId 변경시 currentPage와 expandedItems 초기화
  useEffect(() => {
    setCurrentPage(0);
    setExpandedItems([]);
  }, [restaurantId]);

  // currentPage 변경시 expandedItems 초기화
  useEffect(() => {
    setExpandedItems([]);
  },[currentPage]);

  if (isLoading) {
    return <MapPinLoading />;
  }

  return (
    <section className="history-section">
      {histories?.content && histories.content.length > 0 ? (
        <div className="flex flex-col gap-5">
          <aside className="text-xs text-gray-500">
            해당 사용내역은 각 구청의 업무추진비 데이터를 수집/가공한 것이며,
            원본 데이터는 각 구청에서 확인하실 수 있습니다.
          </aside>
          {histories?.content.map((history, index) => (
            <article key={index} className="flex flex-col gap-3">
              <time
                dateTime={history.historyDate}
                className="self-center rounded-full bg-black px-3 py-1 text-white dark:bg-white dark:text-black">
                {history.historyDate.split('T')[0]}
              </time>
              <header className="font-bold">
                {history.publicOfficeName}{' '}
                {history.consumer === 'Unknown' ? '' : history.consumer}
              </header>

              <div className="flex-between-center">
                <div
                  className="flex items-center"
                  onClick={() => toggleDetails(index)}>
                  <dt className="cursor-pointer text-gray-500 dark:text-white">
                    상세내역
                  </dt>
                  <button
                    className="flex items-center text-gray-500 hover:text-gray-800 dark:text-white"
                    aria-expanded={expandedItems.includes(index)}
                    aria-label={
                      expandedItems.includes(index)
                        ? '상세 정보 접기'
                        : '상세 정보 펼치기'
                    }>
                    {expandedItems.includes(index) ? (
                      <ChevronUp className="size-4" />
                    ) : (
                      <ChevronDown className="size-4" />
                    )}
                  </button>
                </div>
                <dd className="font-bold text-[#FF7058]">
                  {history.price.toLocaleString()}원
                </dd>
              </div>
              {expandedItems.includes(index) && (
                <details open className="text-gray-400">
                  <summary className="hidden">상세 정보</summary>
                  <p>
                    {history.useContent}
                    {history.peopleCount && (
                      <span> ({history.peopleCount}명)</span>
                    )}
                  </p>
                </details>
              )}
              {index !== histories.content.length - 1 && (
                <div className="flex items-center">
                  <div className="w-full border-b border-dashed border-gray-300"></div>
                </div>
              )}
            </article>
          ))}
          <nav>
            <Pagination
              totalPages={histories?.totalPages ? histories.totalPages : 1}
              currentPage={currentPage}
              onPageChange={handleHistoryPageChange}
            />
          </nav>
        </div>
      ) : (
        <p className="text-center">검색된 이용 내역이 없습니다.</p>
      )}
    </section>
  );
}

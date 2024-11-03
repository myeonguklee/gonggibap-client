import { useEffect, useState } from 'react';

import { MapPinLoading } from '@/app/_components/MapPinLoading';
import { Pagination } from '@/app/_components/Pagination';

import { useGetHistories } from '@/apis/history';


interface HistoryContentProps {
  restaurantId: number;
}

export function HistoryContent({ restaurantId }: HistoryContentProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: histories, isLoading } = useGetHistories(
    restaurantId,
    currentPage,
  );

  const handleHistoryPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [restaurantId]);

  if (isLoading) {
    return <MapPinLoading />;
  }

  return (
    <>
      {histories?.content && histories.content.length > 0 ? (
        <div className="flex flex-col gap-5">
          {histories?.content.map((history, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="self-center rounded-full bg-black px-3 py-1 text-white dark:bg-white dark:text-black">
                <p>{history.historyDate.split('T')[0]}</p>
              </div>
              <p className="font-bold">
                {history.publicOfficeName} {history.consumer}
              </p>
              <div className="flex-between-center">
                <p>금액 </p>
                <p className="font-bold text-[#FF7058]">
                  {history.price.toLocaleString()}원
                </p>
              </div>
              <p className="text-gray-400">
                {history.useContent} ({history.peopleCount}명)
              </p>
              {index !== histories.content.length - 1 && (
                <div className="flex items-center">
                  <div className="w-full border-b border-dashed border-gray-300"></div>
                </div>
              )}
            </div>
          ))}
          <Pagination
            totalPages={histories?.totalPages ? histories.totalPages : 1}
            currentPage={currentPage}
            onPageChange={handleHistoryPageChange}
          />
        </div>
      ) : (
        <p className="text-center">검색된 이용 내역이 없습니다.</p>
      )}
    </>
  );
}

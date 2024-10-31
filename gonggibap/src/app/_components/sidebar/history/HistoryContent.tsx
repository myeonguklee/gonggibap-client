import { useEffect, useState } from "react";
import { Pagination } from "@/app/_components/Pagination";
import { MapPinLoading } from "@/app/_components/MapPinLoading";
import { useGetHistories } from "@/apis/history";

interface HistoryContentProps {
  restaurantId: number;
}

export function HistoryContent({ restaurantId }: HistoryContentProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const { data: histories, isLoading } = useGetHistories(
    restaurantId,
    currentPage
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
      {histories?.content.length === 0 ? (
        <div className="flex flex-col gap-5">
          {histories?.content.map((history, index) => (
            <div key={index}>
              <p>
                사용자: {history.publicOfficeName} {history.consumer}
              </p>
              <p>가격: {history.price}</p>
              <p>인원수: {history.peopleCount}</p>
              <p>사용 목적: {history.useContent}</p>
              <p>날짜: {history.historyDate}</p>
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

import { useGetHistories } from "@/apis/history";

interface HistoryContentProps {
  restaurantId: number;
}

export function HistoryContent({ restaurantId }: HistoryContentProps) {
  const { data: histories, error, isLoading } = useGetHistories(restaurantId);
  return (
    <div className="flex flex-col gap-5">
      {histories?.content.map((history, index) => (
        <div key={index}>
          <p>사용자: {history.publicOfficeName} {history.consumer}</p>
          <p>가격: {history.price}</p>
          <p>인원수: {history.peopleCount}</p>
          <p>사용 목적: {history.useContent}</p>
          <p>날짜: {history.historyDate}</p>
        </div>
      ))}
    </div>
  );
}

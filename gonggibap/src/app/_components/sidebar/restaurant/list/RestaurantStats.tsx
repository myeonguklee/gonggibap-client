import { Star, Footprints } from "lucide-react";

interface RestaurantStatsProps {
  publicOfficeName: string;
  pointAvg: number | null;
  visitCount: number;
}

export const RestaurantStats = ({
  publicOfficeName,
  pointAvg,
  visitCount,
}: RestaurantStatsProps) => (
  <div className="flex items-center gap-5">
    <div>
      <span className="sr-only">관련 구청</span>
      <p># {publicOfficeName}</p>
    </div>
    <div className="flex items-center gap-1 text-yellow-400">
      <span className="sr-only">음식점 평점</span>
      <Star size="1rem" />
      {pointAvg ? pointAvg.toFixed(1) : "-"}
    </div>
    <div className="flex items-center gap-1 text-[#FF9A00]">
      <span className="sr-only">방문 횟수</span>
      <Footprints size="1rem" />
      <p>{visitCount}</p>
    </div>
  </div>
);

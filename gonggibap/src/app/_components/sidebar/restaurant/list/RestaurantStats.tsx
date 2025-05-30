interface RestaurantStatsProps {
  pointAvg: number | null;
  visitCount: number;
}

export const RestaurantStats = ({
  pointAvg,
  visitCount,
}: RestaurantStatsProps) => (
  <div className="flex items-center gap-5">
    <div className="gap-1 flex-center">
      <p className="text-xs text-gray-500 dark:text-gray-400">평점</p>
      <div className="min-w-8 rounded-full bg-[#FF7058] text-xs text-white flex-center">
        <p className="font-semibold">{pointAvg ? pointAvg.toFixed(1) : '-'}</p>
      </div>
    </div>
    <div className="gap-1 flex-center">
      <p className="text-xs text-gray-500 dark:text-gray-400">방문수</p>
      <p className="text-xs font-semibold">{visitCount}</p>
    </div>
    {/* 리뷰수 업데이트 후 살리기 */}
    {/* <div className="flex-center gap-2">
      <p className="text-xs text-gray-500 dark:text-gray-400">리뷰수</p>
      <p className="text-xs">{visitCount}</p>
    </div> */}
  </div>
);

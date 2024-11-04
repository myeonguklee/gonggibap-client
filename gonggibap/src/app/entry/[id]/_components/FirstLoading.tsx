import { CookingPot } from 'lucide-react';

export function FirstLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center space-y-4">
        {/* 밥그릇 아이콘 애니메이션 */}
        <div className="animate-bounce">
          <CookingPot size={48} className="mx-auto text-orange-500" />
        </div>

        {/* 제목 */}
        <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          공기밥
        </h1>

        {/* 설명 텍스트와 로딩 도트 */}
        <div className="relative">
          <p className="text-gray-600 dark:text-gray-300">
            공공기관의 업무추진비로 검증된 맛집
          </p>
          <div className="flex justify-center gap-1 mt-2">
            <div
              className="w-2 h-2 rounded-full bg-orange-500 animate-ping"
              style={{ animationDelay: '0ms' }}></div>
            <div
              className="w-2 h-2 rounded-full bg-orange-500 animate-ping"
              style={{ animationDelay: '200ms' }}></div>
            <div
              className="w-2 h-2 rounded-full bg-orange-500 animate-ping"
              style={{ animationDelay: '400ms' }}></div>
          </div>
        </div>

        {/* 장식적인 요소 */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-16 h-1 bg-orange-200 rounded animate-pulse"></div>
          <div
            className="w-16 h-1 bg-orange-300 rounded animate-pulse"
            style={{ animationDelay: '200ms' }}></div>
          <div
            className="w-16 h-1 bg-orange-400 rounded animate-pulse"
            style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
    </div>
  );
}

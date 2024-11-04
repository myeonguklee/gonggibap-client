import { CookingPot } from 'lucide-react';

export function FirstLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="space-y-4 text-center">
        {/* 밥그릇 아이콘 애니메이션 */}
        <div className="animate-bounce">
          <CookingPot size={48} className="mx-auto text-orange-500" />
        </div>

        {/* 제목 */}
        <h1 className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-6xl font-bold text-transparent">
          공기밥
        </h1>

        {/* 설명 텍스트와 로딩 도트 */}
        <div className="relative">
          <p className="text-gray-600 dark:text-gray-300">
            공공기관의 업무추진비로 검증된 맛집
          </p>
          <div className="mt-2 flex justify-center gap-1">
            <div
              className="size-2 animate-ping rounded-full bg-orange-500"
              style={{ animationDelay: '0ms' }}></div>
            <div
              className="size-2 animate-ping rounded-full bg-orange-500"
              style={{ animationDelay: '200ms' }}></div>
            <div
              className="size-2 animate-ping rounded-full bg-orange-500"
              style={{ animationDelay: '400ms' }}></div>
          </div>
        </div>

        {/* 장식적인 요소 */}
        <div className="mt-4 flex justify-center gap-2">
          <div className="h-1 w-16 animate-pulse rounded bg-orange-200"></div>
          <div
            className="h-1 w-16 animate-pulse rounded bg-orange-300"
            style={{ animationDelay: '200ms' }}></div>
          <div
            className="h-1 w-16 animate-pulse rounded bg-orange-400"
            style={{ animationDelay: '400ms' }}></div>
        </div>
      </div>
    </div>
  );
}

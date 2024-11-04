import { FaSearchLocation } from 'react-icons/fa';

export const RestaurantEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
        <FaSearchLocation className="h-8 w-8 text-gray-400 dark:text-gray-500" />
      </div>
      <div className="text-center">
        <h3 className="mb-1 font-medium text-gray-900 dark:text-gray-200">
          검색된 식당이 없습니다
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          다른 키워드로 다시 검색해보세요
        </p>
      </div>
    </div>
  );
};

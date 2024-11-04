import { Suspense } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { Restaurant, RestaurantDetailCategory } from '@/types/restaurant';

import { MapPinLoading } from '@/app/_components/MapPinLoading';
import {
  RestaurantDetailView,
  RestaurantDetailSkeleton,
  RestaurantDetailErrorFallback,
} from '@/app/_components/sidebar/restaurant/detail';
import { RestaurantListView } from '@/app/_components/sidebar/restaurant/list';
import { ThemeToggleBtn } from '@/app/_components/ThemeToggleBtn';

import { MdOutlineFeedback } from 'react-icons/md';
import { PiNavigationArrowBold } from 'react-icons/pi';

type DesktopSidebarProps = {
  restaurants?: Restaurant[];
  totalPages?: number;
  selectedRestaurantId: number | null;
  onRestaurantSelect: (id: number | null) => void;
  onCurrentLocation: () => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSelectCategory: (category: RestaurantDetailCategory) => void;
  onRestaurantSearch: (keyword: string) => void;
};

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  restaurants,
  totalPages,
  selectedRestaurantId,
  onRestaurantSelect,
  onCurrentLocation,
  currentPage,
  onPageChange,
  onSelectCategory,
  onRestaurantSearch,
}) => {
  const selectedRestaurant =
    selectedRestaurantId && restaurants
      ? restaurants.find((r) => r.restaurantId === selectedRestaurantId)
      : null;

  const handleFeedbackClick = () => {
    window.open('https://forms.gle/WFvToA68sKEQFYG77', '_blank');
  };

  return (
    <div className="flex">
      <div
        className="fixed left-0 top-0 z-20 h-screen w-80 overflow-y-auto bg-white p-4 dark:bg-gray-700"
        role="navigation">
        <Suspense fallback={<MapPinLoading />}>
          <RestaurantListView
            restaurants={restaurants}
            totalPages={totalPages}
            onRestaurantSelect={onRestaurantSelect}
            selectedRestaurantId={selectedRestaurantId}
            currentPage={currentPage}
            onPageChange={onPageChange}
            onRestaurantSearch={onRestaurantSearch}
          />
        </Suspense>
      </div>
      <section
        className={`fixed left-[21rem] top-[2%] z-10 h-[96%] w-96 overflow-y-auto rounded-xl bg-white
          p-4 transition-transform duration-300 ease-in-out dark:bg-gray-700
          ${selectedRestaurantId ? 'translate-x-0' : '-translate-x-[25rem]'}`}
        aria-label="레스토랑 상세 정보"
        aria-hidden={!selectedRestaurantId}>
        {selectedRestaurant && (
          <ErrorBoundary FallbackComponent={RestaurantDetailErrorFallback}>
            <Suspense fallback={<RestaurantDetailSkeleton />}>
              <RestaurantDetailView
                restaurantId={selectedRestaurant.restaurantId}
                onClose={() => onRestaurantSelect(null)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </section>
      <button
        onClick={handleFeedbackClick}
        className="fixed bottom-52 right-4 z-10 rounded-full bg-white p-3 shadow-lg hover:bg-gray-100 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="프로젝트 피드백">
        <MdOutlineFeedback className="size-6 rotate-90 text-[#B3B3B3]" />
      </button>
      <button
        onClick={() => {
          onCurrentLocation();
          onRestaurantSelect(null);
          onSelectCategory(null);
        }}
        className="fixed bottom-36 right-4 z-10 rounded-full bg-white p-3 shadow-lg hover:bg-gray-100 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700"
        aria-label="현재 위치로 이동">
        <PiNavigationArrowBold className="size-6 rotate-90 text-[#B3B3B3]" />
      </button>
      <ThemeToggleBtn />
    </div>
  );
};

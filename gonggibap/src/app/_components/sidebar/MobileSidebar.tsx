import {
  useState,
  TouchEvent as ReactTouchEvent,
  useRef,
  useEffect,
  Suspense,
} from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { Restaurant, RestaurantDetailCategory } from '@/types/restaurant';
import { MobilePosition, MobileView } from '@/types/sidebar';

import { MapPinLoading } from '@/app/_components/MapPinLoading';
import {
  RestaurantDetailView,
  RestaurantDetailSkeleton,
  RestaurantDetailErrorFallback,
} from '@/app/_components/sidebar/restaurant/detail';
import { RestaurantListView } from '@/app/_components/sidebar/restaurant/list/RestaurantListView';
import { ThemeToggleBtn } from '@/app/_components/ThemeToggleBtn';

import { MdOutlineFeedback } from 'react-icons/md';
import { PiNavigationArrowBold } from 'react-icons/pi';

type MobileSidebarProps = {
  restaurants?: Restaurant[];
  totalPages?: number;
  selectedRestaurantId: number | null;
  onRestaurantSelect: (id: number | null) => void;
  onCurrentLocation: () => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSelectCategory: (category: RestaurantDetailCategory) => void;
  isFavorite: boolean;
  onFavoriteRestaurantFilter: (value: boolean) => void;
};

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  restaurants,
  totalPages,
  selectedRestaurantId,
  onRestaurantSelect,
  onCurrentLocation,
  currentPage,
  onPageChange,
  onSelectCategory,
  isFavorite,
  onFavoriteRestaurantFilter,
}) => {
  const [position, setPosition] = useState<MobilePosition>('peek');
  const [view, setView] = useState<MobileView>('list');
  const [touchState, setTouchState] = useState({
    startY: 0,
    startX: 0,
    currentY: 0,
    currentX: 0,
    isDragging: false,
  });
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const selectedRestaurant = restaurants?.find(
    (r) => r.restaurantId === selectedRestaurantId,
  );

  const handleFeedbackClick = () => {
    window.open('https://forms.gle/WFvToA68sKEQFYG77', '_blank');
  };

  const handleBackToList = () => {
    setView('list');
    onRestaurantSelect(null);
  };

  const handleTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    setTouchState({
      startY: e.touches[0].clientY,
      startX: e.touches[0].clientX,
      currentY: e.touches[0].clientY,
      currentX: e.touches[0].clientX,
      isDragging: true,
    });
  };

  const handleTouchMove = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (!touchState.isDragging) return;
    setTouchState((prev) => ({
      ...prev,
      currentY: e.touches[0].clientY,
      currentX: e.touches[0].clientX,
    }));
  };

  const handleTouchEnd = () => {
    if (!touchState.isDragging) return;

    const verticalDiff = touchState.startY - touchState.currentY;
    const horizontalDiff = touchState.startX - touchState.currentX;
    const verticalThreshold = 30;
    const horizontalThreshold = 50;
    const contentElement = document.querySelector(
      '.mobile-content',
    ) as HTMLElement;
    const isScrolledToTop = contentElement?.scrollTop === 0;

    // Handle horizontal swipe only in detail view
    if (
      view === 'detail' &&
      Math.abs(horizontalDiff) > horizontalThreshold &&
      Math.abs(horizontalDiff) > Math.abs(verticalDiff)
    ) {
      if (horizontalDiff < 0) {
        // Changed from > 0 to < 0 to reverse swipe direction
        // Swipe right
        handleBackToList();
      }
      setTouchState((prev) => ({ ...prev, isDragging: false }));
      return;
    }

    // Handle vertical swipe
    if (Math.abs(verticalDiff) < verticalThreshold) {
      setTouchState((prev) => ({ ...prev, isDragging: false }));
      return;
    }

    if (verticalDiff > 0) {
      setPosition((prev) => {
        if (prev === 'peek') return 'half';
        if (prev === 'half') return 'full';
        return prev;
      });
    } else {
      if (position === 'full' && isScrolledToTop) {
        setPosition('half');
      } else if (position === 'half') {
        setPosition('peek');
      }
    }

    setTouchState((prev) => ({ ...prev, isDragging: false }));
  };

  const positionToHeightClass = {
    peek: 'h-24',
    half: 'h-1/2',
    full: 'h-[85vh]',
  };

  useEffect(() => {
    const element = sidebarRef.current;
    if (!element) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchState.isDragging) return;
      if (position !== 'full') {
        e.preventDefault();
      }
    };

    const touchMoveHandler: EventListener = (e: Event) => {
      if (e instanceof TouchEvent) {
        handleTouchMove(e);
      }
    };

    element.addEventListener('touchmove', touchMoveHandler, { passive: false });

    return () => {
      element.removeEventListener('touchmove', touchMoveHandler);
    };
  }, [touchState.isDragging, position]);

  useEffect(() => {
    if (selectedRestaurantId) {
      setView('detail');
      setPosition('half');
    } else {
      setView('list');
      setPosition('half');
    }
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [selectedRestaurantId]);

  useEffect(() => {
    if (restaurants && restaurants.length > 0) {
      setPosition('half');
    }
  }, [restaurants]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed bottom-0 left-0 z-20 w-full rounded-t-3xl bg-white
        shadow-lg transition-all duration-300 ease-out dark:bg-gray-700 ${positionToHeightClass[position]}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="모바일 메뉴">
      <div className="relative">
        <button
          onClick={handleFeedbackClick}
          className={`absolute -top-48 right-4 z-10 rounded-full bg-white p-3 shadow-lg hover:bg-gray-100 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700
            ${position === 'full' && 'hidden'}`}
          aria-label="프로젝트 피드백">
          <MdOutlineFeedback className="size-6 rotate-90 text-[#B3B3B3]" />
        </button>
        <button
          onClick={() => {
            onCurrentLocation();
            onRestaurantSelect(null);
            onSelectCategory(null);
          }}
          className={`absolute -top-32 right-4 z-10 rounded-full bg-white p-3 shadow-lg hover:bg-gray-100 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700
            ${position === 'full' && 'hidden'}`}
          aria-label="현재 위치로 이동">
          <PiNavigationArrowBold className="size-6 rotate-90 text-[#B3B3B3]" />
        </button>
        <ThemeToggleBtn position={position} />
      </div>
      <div
        className="drag-handle h-6 w-full touch-none flex-center"
        role="button"
        aria-label="스와이프로 메뉴 조절">
        <div className="h-1 w-10 rounded-full bg-gray-600" />
      </div>

      <div
        ref={contentRef}
        className={`
          mobile-content h-[calc(100%-1.5rem)] overflow-y-auto px-4 pt-4
          ${position === 'full' ? 'touch-auto' : 'touch-none'}
        `}>
        {view === 'list' ? (
          <Suspense fallback={<MapPinLoading />}>
            <RestaurantListView
              restaurants={restaurants}
              totalPages={totalPages}
              selectedRestaurantId={selectedRestaurantId}
              onRestaurantSelect={onRestaurantSelect}
              currentPage={currentPage}
              onPageChange={onPageChange}
              isFavorite={isFavorite}
              onFavoriteRestaurantFilter={onFavoriteRestaurantFilter}
              mobilePosition={position}
            />
          </Suspense>
        ) : (
          selectedRestaurant && (
            <ErrorBoundary FallbackComponent={RestaurantDetailErrorFallback}>
              <Suspense fallback={<RestaurantDetailSkeleton />}>
                <RestaurantDetailView
                  restaurantId={selectedRestaurant.restaurantId}
                  onBack={handleBackToList}
                />
              </Suspense>
            </ErrorBoundary>
          )
        )}
      </div>
    </div>
  );
};

import { useState, useEffect, TouchEvent } from "react";
import { MobilePosition, MobileView, Restaurant } from '@/types/sidebar';
import { RestaurantListView } from "@/app/_components/RestaurantListView";
import { RestaurantDetailView } from "@/app/_components/RestaurantDetailView";
import { MOBILE_VIEWS, MOBILE_BREAKPOINT } from "@/constants/sidebar";

type SidebarProps = {
  restaurants: Restaurant[];
};

export const Sidebar: React.FC<SidebarProps> = ({ restaurants }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobilePosition, setMobilePosition] = useState<MobilePosition>("peek");
  const [mobileView, setMobileView] = useState<MobileView>(MOBILE_VIEWS.LIST);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [startY, setStartY] = useState<number>(0);
  const [currentY, setCurrentY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleRestaurantSelect = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    if (isMobile) {
      setMobileView(MOBILE_VIEWS.DETAIL);
      setMobilePosition("full");
    }
  };

  const handleBackToList = () => {
    setMobileView(MOBILE_VIEWS.LIST);
    setSelectedRestaurant(null);
    setMobilePosition("half");
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    if (mobilePosition !== "full") {
      e.preventDefault();
    }
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = startY - currentY;
    const threshold = 30;

    if (Math.abs(diff) < threshold) return;

    const contentElement = document.querySelector(
      ".mobile-content"
    ) as HTMLElement;
    const isScrolledToTop = contentElement.scrollTop === 0;

    if (diff > 0) {
      if (mobilePosition === "peek") setMobilePosition("half");
      else if (mobilePosition === "half") setMobilePosition("full");
    } else {
      if (mobilePosition === "full" && isScrolledToTop) {
        setMobilePosition("half");
      } else if (mobilePosition === "half") {
        setMobilePosition("peek");
      }
    }
  };

  const getMobileHeightClass = () => {
    switch (mobilePosition) {
      case "peek":
        return "h-24";
      case "half":
        return "h-1/2";
      case "full":
        return "h-[85vh]";
      default:
        return "h-24";
    }
  };

  // 데스크톱 레이아웃 렌더링
  if (!isMobile) {
    return (
      <div className="flex">
        {/* 메인 사이드바 */}
        <div className="w-64 h-screen bg-gray-800 text-white p-4 fixed left-0 top-0 z-20 overflow-y-auto">
          <RestaurantListView
            restaurants={restaurants}
            onRestaurantSelect={handleRestaurantSelect}
            selectedRestaurantId={selectedRestaurant?.id}
          />
        </div>

        {/* 중첩 사이드바 */}
        <div
          className={`w-80 h-screen bg-gray-700 text-white p-6 fixed left-64 top-0 
            transition-transform duration-300 ease-in-out z-10 overflow-y-auto
            ${selectedRestaurant ? "translate-x-0" : "-translate-x-full"}`}
        >
          {selectedRestaurant && (
            <RestaurantDetailView
              restaurant={selectedRestaurant}
              onClose={() => setSelectedRestaurant(null)}
              isMobile={false}
            />
          )}
        </div>
      </div>
    );
  }

  // 모바일 레이아웃 렌더링
  return (
    <div
      className={`fixed bottom-0 left-0 w-full bg-gray-800 text-white 
        rounded-t-3xl shadow-lg transform transition-all duration-300 ease-out
        ${getMobileHeightClass()}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 드래그 핸들 */}
      <div className="w-full h-6 flex justify-center items-center touch-none drag-handle">
        <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
      </div>

      {/* 스크롤 가능한 콘텐츠 영역 */}
      <div
        className={`
        overflow-y-auto h-[calc(100%-1.5rem)] p-4 mobile-content
        ${mobilePosition === "full" ? "touch-auto" : "touch-none"}
      `}
      >
        {mobileView === MOBILE_VIEWS.LIST ? (
          <RestaurantListView
            restaurants={restaurants}
            onRestaurantSelect={handleRestaurantSelect}
            selectedRestaurantId={selectedRestaurant?.id}
          />
        ) : (
          selectedRestaurant && (
            <RestaurantDetailView
              restaurant={selectedRestaurant}
              onBack={handleBackToList}
              isMobile={true}
            />
          )
        )}
      </div>
    </div>
  );
};

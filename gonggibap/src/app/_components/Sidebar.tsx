// types.ts
export type Restaurant = {
  id: number;
  name: string;
  rating: number;
  category: string;
  distance: string;
  details: RestaurantDetails;
};

export type RestaurantDetails = {
  address: string;
  openingHours: string;
  phoneNumber: string;
  menu: MenuItem[];
  reviews: Review[];
};

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
};

export type Review = {
  id: number;
  userName: string;
  rating: number;
  content: string;
  date: string;
};

// constants.ts
export const MOBILE_BREAKPOINT = 768;
export const MOBILE_VIEWS = {
  LIST: "list",
  DETAIL: "detail",
} as const;

export type MobileView = (typeof MOBILE_VIEWS)[keyof typeof MOBILE_VIEWS];
export type MobilePosition = "peek" | "half" | "full";

// components/RestaurantListView.tsx
// import React from 'react';
// import { Restaurant } from '../types';

type RestaurantListViewProps = {
  restaurants: Restaurant[];
  onRestaurantSelect: (restaurant: Restaurant) => void;
  selectedRestaurantId?: number;
};

export const RestaurantListView: React.FC<RestaurantListViewProps> = ({
  restaurants,
  onRestaurantSelect,
  selectedRestaurantId,
}) => {
  return (
    <div className="space-y-4">
      {restaurants.map((restaurant) => (
        <button
          key={restaurant.id}
          onClick={() => onRestaurantSelect(restaurant)}
          className={`w-full text-left p-4 rounded-lg transition-colors
            ${
              selectedRestaurantId === restaurant.id
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-700"
            }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold">{restaurant.name}</h3>
              <p className="text-sm text-gray-300">{restaurant.category}</p>
            </div>
            <div className="text-right">
              <div className="text-yellow-400">
                {"⭐".repeat(restaurant.rating)}
              </div>
              <p className="text-sm text-gray-300">{restaurant.distance}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

// components/RestaurantDetailView.tsx
// import React from 'react';
// import { Restaurant } from '../types';

type RestaurantDetailViewProps = {
  restaurant: Restaurant;
  onClose?: () => void; // 웹 닫기 버튼
  isMobile?: boolean;
  onBack?: () => void; // 모바일 뒤로가기 버튼
};

export const RestaurantDetailView: React.FC<RestaurantDetailViewProps> = ({
  restaurant,
  onClose,
  isMobile,
  onBack,
}) => {
  const [isWriting, setIsWriting] = useState<boolean>(false);
  // 토글하는 함수
  const onClickWriteReview = () => setIsWriting((prev) => !prev);

  return (
    <div className="space-y-6">
      {/* 모바일일 때는 뒤로가기, 웹일 때는 닫기 버튼 */}
      {isMobile ? (
        <button
          onClick={onBack}
          className="mb-4 px-2 py-1 text-sm rounded bg-gray-700 hover:bg-gray-600"
        >
          ← 목록으로
        </button>
      ) : (
        <button
          onClick={onClose}
          className="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-600"
          aria-label="닫기"
        >
          ✕
        </button>
      )}

      <div>
        <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
        <div className="space-y-2 text-gray-300">
          <p>⭐ {restaurant.rating}</p>
          <p>📍 {restaurant.details.address}</p>
          <p>🕒 {restaurant.details.openingHours}</p>
          <p>📞 {restaurant.details.phoneNumber}</p>
          <button onClick={onClickWriteReview}>리뷰 작성하기</button>
        </div>
      </div>

      {isWriting ? (
        <div>
          <h1>리뷰 폼 넣기</h1>
        </div>
      ) : (
        <>
          <div>
            <h3 className="text-lg font-bold mb-3">메뉴</h3>
            <div className="space-y-3">
              {restaurant.details.menu.map((item) => (
                <div key={item.id} className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.name}</span>
                    <span>{item.price.toLocaleString()}원</span>
                  </div>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3">리뷰</h3>
            <div className="space-y-3">
              {restaurant.details.reviews.map((review) => (
                <div key={review.id} className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{review.userName}</span>
                    <span className="text-yellow-400">
                      {"⭐".repeat(review.rating)}
                    </span>
                  </div>
                  <p className="text-sm mb-1">{review.content}</p>
                  <p className="text-xs text-gray-400">{review.date}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// components/Sidebar.tsx
import React, { useState, useEffect, TouchEvent } from "react";
// import { Restaurant, MobilePosition, MobileView, MOBILE_VIEWS, MOBILE_BREAKPOINT } from '../types';
// import { RestaurantListView } from './RestaurantListView';
// import { RestaurantDetailView } from './RestaurantDetailView';

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

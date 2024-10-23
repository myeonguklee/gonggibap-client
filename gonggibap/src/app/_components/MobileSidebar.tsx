import { useRef, useState } from "react";
import { MobilePosition, MobileView, Restaurant } from "@/types/sidebar";
import { useTouchHandler } from "@/hooks/useTouchHandler";
import { useAnimatedPosition } from "@/hooks/useAnimatedPosition";
import { RestaurantListView } from "@/app/_components/RestaurantListView";
import { RestaurantDetailView } from "@/app/_components/RestaurantDetailView";

type MobileSidebarProps = {
  restaurants: Restaurant[];
};

export const MobileSidebar: React.FC<MobileSidebarProps> = ({
  restaurants,
}) => {
  const [position, setPosition] = useState<MobilePosition>("peek");
  const [view, setView] = useState<MobileView>("list");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { touchHandlers, isDragging } = useTouchHandler({
    onPositionChange: setPosition,
    currentPosition: position,
    contentRef
  });

  const animationConfig = useAnimatedPosition(position, isDragging);
    // 레스토랑 선택 핸들러
    const handleRestaurantSelect = (restaurant: Restaurant) => {
      setSelectedRestaurant(restaurant);
      setView("detail");
      setPosition("full");
    };
  
    // 목록으로 돌아가기 핸들러
    const handleBackToList = () => {
      setView("list");
      setSelectedRestaurant(null);
      setPosition("half");
    };

  return (
    <div
      className={`
        fixed bottom-0 left-0 w-full bg-gray-800 text-white 
        rounded-t-3xl shadow-lg
        ${animationConfig.height}
        ${animationConfig.transform}
      `}
      style={{ transition: animationConfig.transition }}
      {...touchHandlers}
    >
      <div className="w-full h-6 touch-none drag-handle flex-center">
        <div className="w-10 h-1 bg-gray-600 rounded-full" />
      </div>

      <div
        ref={contentRef}
        className={`
          overflow-y-auto h-[calc(100%-1.5rem)] p-4 mobile-content
          ${position === "full" ? "touch-auto" : "touch-none"}
        `}
      >

        {view === "list" ? (
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

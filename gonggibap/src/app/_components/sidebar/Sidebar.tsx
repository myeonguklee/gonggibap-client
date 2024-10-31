import { Restaurant } from "@/types/restaurant";
import { MobileSidebar } from "@/app/_components/sidebar/MobileSidebar";
import { DesktopSidebar } from "@/app/_components/sidebar/DesktopSidebar";

type SidebarProps = {
  restaurants?: Restaurant[];
  totalPages?: number;
  selectedRestaurantId: number | null;
  onRestaurantSelect: (id: number | null) => void;
  onCurrentLocation: () => void;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  restaurants,
  totalPages,
  selectedRestaurantId,
  onRestaurantSelect,
  onCurrentLocation,
  currentPage,
  onPageChange,
}) => {
  return (
    <nav aria-label="사이드바">
      <div className="hidden md:block" aria-label="데스크톱 사이드바">
        <DesktopSidebar
          restaurants={restaurants}
          totalPages={totalPages}
          selectedRestaurantId={selectedRestaurantId}
          onRestaurantSelect={onRestaurantSelect}
          onCurrentLocation={onCurrentLocation}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
      <div className="block md:hidden" aria-label="모바일 사이드바">
        <MobileSidebar
          restaurants={restaurants}
          totalPages={totalPages}
          selectedRestaurantId={selectedRestaurantId}
          onRestaurantSelect={onRestaurantSelect}
          onCurrentLocation={onCurrentLocation}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </div>
    </nav>
  );
};

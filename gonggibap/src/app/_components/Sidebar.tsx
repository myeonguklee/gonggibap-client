import { Restaurant } from "@/types/restaurant";
import { MobileSidebar } from "@/app/_components/MobileSidebar";
import { DesktopSidebar } from "@/app/_components/DesktopSidebar";

type SidebarProps = {
  restaurants: Restaurant[];
  totalPages: number;
  selectedRestaurantId: number | null;
  onRestaurantSelect: (id: number | null) => void;
};

export const Sidebar: React.FC<SidebarProps> = ({
  restaurants,
  totalPages,
  selectedRestaurantId,
  onRestaurantSelect,
}) => {
  return (
    <nav aria-label="사이드바">
      <div className="hidden md:block" aria-label="데스크톱 사이드바">
        <DesktopSidebar
          restaurants={restaurants}
          totalPages={totalPages}
          selectedRestaurantId={selectedRestaurantId}
          onRestaurantSelect={onRestaurantSelect}
        />
      </div>
      <div className="block md:hidden" aria-label="모바일 사이드바">
        <MobileSidebar
          restaurants={restaurants}
          totalPages={totalPages}
          selectedRestaurantId={selectedRestaurantId}
          onRestaurantSelect={onRestaurantSelect}
        />
      </div>
    </nav>
  );
};

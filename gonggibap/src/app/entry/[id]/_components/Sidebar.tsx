import { DesktopSidebar } from "@/app/entry/[id]/_components/DesktopSidebar";
import { MobileSidebar } from "@/app/entry/[id]/_components/MobileSidebar";
import { Restaurant } from "@/types/restaurant";

interface SidebarProps {
  restaurant: Restaurant;
}

export function Sidebar({ restaurant }: SidebarProps) {
  return (
    <nav aria-label="사이드바">
      <div className="hidden md:block" aria-label="데스크톱 사이드바">
        <DesktopSidebar restaurant={restaurant} />
      </div>
      <div className="block md:hidden" aria-label="모바일 사이드바">
        <MobileSidebar restaurant={restaurant} />
      </div>
    </nav>
  );
}

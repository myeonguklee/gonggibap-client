import { useState, useEffect } from "react";
import { Restaurant } from "@/types/restaurant";
import { MOBILE_BREAKPOINT } from "@/constants/sidebar";
import { MobileSidebar } from "@/app/_components/MobileSidebar";
import { DesktopSidebar } from "@/app/_components/DesktopSidebar";

type SidebarProps = {
  restaurants: Restaurant[];
};

export const Sidebar: React.FC<SidebarProps> = ({ restaurants }) => {
  return (
    <>
      <div className="block md:hidden">
        <MobileSidebar restaurants={restaurants} />
      </div>
      <div className="hidden md:block">
        <DesktopSidebar restaurants={restaurants} />
      </div>
    </>
  );
};

import { useState, useEffect } from "react";
import { Restaurant } from '@/types/sidebar';
import { MOBILE_BREAKPOINT } from "@/constants/sidebar";
import { MobileSidebar } from "@/app/_components/MobileSidebar";
import { DesktopSidebar } from "@/app/_components/DesktopSidebar";

type SidebarProps = {
  restaurants: Restaurant[];
};

export const Sidebar: React.FC<SidebarProps> = ({ restaurants }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? (
    <MobileSidebar restaurants={restaurants} />
  ) : (
    <DesktopSidebar restaurants={restaurants} />
  );
};
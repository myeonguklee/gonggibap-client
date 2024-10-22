'use client';
import Sidebar from "@/app/_components/Sidebar"
import { useState } from "react";

export default function SamplePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div>
        샘플페이지
      </div>
    </div>
  );
};
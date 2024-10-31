"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function ThemeToggleBtn() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`w-12 h-12
        ${isMobile ? ("absolute -top-16 right-4"):("fixed right-4 bottom-20")}
        bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none flex-center z-10`}
    >
      {theme === "dark" ? <Moon color="#B3B3B3" /> : <Sun color="#B3B3B3" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

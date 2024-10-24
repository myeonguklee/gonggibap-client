"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon } from "@/app/_components/Moon";
import { Sun } from "@/app/_components/Sun";

export function ThemeToggleBtn() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

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
      className="w-10 h-10 bg-white dark:bg-black border border-gray-400 rounded-full fixed top-4 right-4 flex-center z-10"
    >
      {theme === "dark" ? <Moon /> : <Sun />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

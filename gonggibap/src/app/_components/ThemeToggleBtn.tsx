"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon } from "./Moon";
import { Sun } from "./Sun";

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
      className="w-10 h-10 border border-gray-400 rounded-full fixed top-4 right-4 flex-center"
    >
      {theme === "dark" ? <Moon /> : <Sun />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}

import { useTheme } from 'next-themes'
import React, { useEffect, useState } from "react";
import { IoInvertModeOutline } from "react-icons/io5";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-center">
      {theme === "light" ? (
        <IoInvertModeOutline
          className=" cursor-pointer text-gray-500 dark:text-gray-400"
          size={25}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <IoInvertModeOutline
          size={25}
          className=" cursor-pointer text-gray-500 dark:text-gray-400"
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
}
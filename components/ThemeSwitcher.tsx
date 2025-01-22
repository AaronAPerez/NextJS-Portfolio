'use client';

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [, setIsHovered] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  

  const isDark = theme === 'dark';

  
  return (
    <motion.button
      className={cn(
        "p-2 rounded-full backdrop-blur-sm z-50",
        "border border-white/[0.2]",
        "bg-white/10 hover:bg-white/20",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      )}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <motion.div
          animate={{
            scale: isDark ? 0.5 : 1,
            opacity: isDark ? 0 : 1,
            rotate: isDark ? -180 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <SunIcon className="w-6 h-6 text-yellow-400" />
        </motion.div>

        {/* Moon Icon */}
        <motion.div
          animate={{
            scale: isDark ? 1 : 0.5,
            opacity: isDark ? 1 : 0,
            rotate: isDark ? 0 : 180,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <MoonIcon className="w-6 h-6 text-blue-400" />
        </motion.div>
      </div>
      <span className="sr-only">
        {`Currently in ${theme} mode. Click to switch to ${isDark ? 'light' : 'dark'} mode`}
      </span>
    </motion.button>
  );
};

export default ThemeSwitcher
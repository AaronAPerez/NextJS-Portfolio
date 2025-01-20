'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon, StarIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';


export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isHovered] = useState(false);

  // Wait until mounted to prevent hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === 'dark';

  return (
    <motion.button
      className={cn(
        "p-2 rounded-full backdrop-blur-sm z-50",
        "border border-white/[0.2]",
        "bg-white/10 hover:bg-white/20",
        "transition-colors duration-200"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
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
        >
          <MoonIcon className="w-6 h-6 text-blue-400" />
        </motion.div>

        {/* Animated Stars */}
        <AnimatePresence>
          {isHovered && isDark && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: Math.random() * 20 - 10,
                    y: Math.random() * 20 - 10,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ 
                    duration: 1,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 2
                  }}
                  className="absolute"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                >
                  <StarIcon className="w-2 h-2 text-yellow-400" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Hover Background Effect */}
       <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: isDark 
            ? "radial-gradient(circle at center, #60A5FA 0%, transparent 70%)"
            : "radial-gradient(circle at center, #FCD34D 0%, transparent 70%)",
          opacity: isHovered ? 0.2 : 0,
        }}
        transition={{ duration: 0.3 }}
      /> 
    </motion.button>
  );
};

export default ThemeSwitcher
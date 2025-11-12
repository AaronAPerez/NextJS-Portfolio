'use client';

import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';


/**
 * ThemeToggle Component
 * 
 * Button to toggle between light and dark mode.
 * Displays sun icon in light mode, moon icon in dark mode.
 */

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative w-8 h-8 rounded-full flex items-center justify-center',
        'transition-colors duration-200',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {/* Sun icon - visible in dark mode */}
      <Sun
        className={cn(
          'absolute w-5 h-5 text-gray-700 dark:text-gray-300',
          'transition-all duration-300',
          theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
        )}
      />
      
      {/* Moon icon - visible in light mode */}
      <Moon
        className={cn(
          'absolute w-5 h-5 text-gray-700 dark:text-gray-300',
          'transition-all duration-300',
          theme === 'light' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
        )}
      />
    </button>
  );
}
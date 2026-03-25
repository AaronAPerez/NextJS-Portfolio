/**
 * APHeader Component
 *
 * Presentational logo component for the site header.
 * Displays the AP Designs logo icon and text branding.
 *
 * Note: This component should NOT contain a Link wrapper.
 * The parent component (Header.tsx) handles navigation wrapping
 * to avoid nested <a> tags which cause hydration errors.
 */

import Image from "next/image";
import React from "react";

interface APHeaderProps {
  /** Path to the logo icon */
  iconSrc?: string;
  /** Additional CSS classes */
  className?: string;
}

export const APHeader: React.FC<APHeaderProps> = ({
  iconSrc = "/favicon-48x48.svg",
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${className}`}>
      {/* Logo Icon */}
      <Image
        src={iconSrc}
        alt=""
        width={20}
        height={20}
        aria-hidden="true"
        className="h-8 w-auto sm:h-10"
      />

      {/* Brand Text */}
      <div className="flex flex-col leading-tight">
        <span
          className="
            text-lg sm:text-xl font-bold
            bg-gradient-to-r from-sky-400 to-indigo-500
            bg-clip-text text-transparent
            transition-opacity group-hover:opacity-80
          "
        >
          AP Designs
        </span>

        <span
          className="
            text-[8px] sm:text-xs uppercase tracking-widest
            text-gray-500 dark:text-gray-400
          "
        >
          Web Development
        </span>
      </div>
    </div>
  );
};

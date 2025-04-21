"use client";

import React, { JSX, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

// interface for component props
interface BorderMagicButtonProps {
  title: string;
  icon: ReactNode;
  position: 'left' | 'right';
  handleClick?: () => void;
  otherClasses?: string;
}

const BorderMagicButton = ({
  title,
  icon,
  position,
  otherClasses,
  handleClick
}: BorderMagicButtonProps): JSX.Element => {
  // Define button motion props separately to avoid type conflicts
  const buttonMotionProps: HTMLMotionProps<"button"> = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    onClick: handleClick
  };

  return (
    <motion.button
      {...buttonMotionProps}
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[1px]",
        "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        otherClasses
      )}
      aria-label={title} // Add aria-label for accessibility
    >
      {/* Animated background gradient */}
      <span 
        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" 
        aria-hidden="true"
      />
      
      {/* Button content */}
      <span 
        className={cn(
          "inline-flex h-full w-full cursor-pointer items-center justify-center",
          "rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white",
          "backdrop-blur-3xl gap-2"
        )}
      >
        {position === 'left' && icon}
        <span>{title}</span>
        {position === 'right' && icon}
      </span>
    </motion.button>
  );
};

export default BorderMagicButton;
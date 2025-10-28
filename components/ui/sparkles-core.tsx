'use client';

import React from "react";
import { cn } from "@/lib/utils";

interface SparklesCoreProps {
  id: string;
  className?: string;
  particleColor?: string;
  background?: string;
}

// Generate stable sparkle positions to prevent hydration mismatch
const generateSparkles = (count: number) => {
  const sparkles = [];
  for (let i = 0; i < count; i++) {
    // Use seeded values based on index for SSR consistency
    sparkles.push({
      left: ((i * 37) % 100),
      top: ((i * 73) % 100),
      delay: ((i * 0.13) % 2),
    });
  }
  return sparkles;
};

export function SparklesCore({
  id,
  className,
  particleColor = "rgb(37, 99, 235)",
  background = "transparent"
}: SparklesCoreProps) {
  const sparkles = React.useMemo(() => generateSparkles(20), []);

  return (
    <div id={id} className={cn("absolute inset-0 pointer-events-none", className)}>
      <div className="absolute inset-0" style={{ background }}>
        <div className="absolute inset-0 bg-repeat sparkles-pattern opacity-50" />
        {sparkles.map((sparkle, i) => (
          <div
            key={i}
            className="absolute sparkle"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.delay}s`,
              backgroundColor: particleColor,
            }}
          />
        ))}
      </div>
      <svg width="0" height="0">
        <defs>
          <filter id="sparkles-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            <feColorMatrix
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 15 -7
              "
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
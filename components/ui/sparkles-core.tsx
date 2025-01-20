'use client';

import React from "react";
import { cn } from "@/lib/utils";

interface SparklesCoreProps {
  id: string;
  className?: string;
  particleColor?: string;
  background?: string;
}

export function SparklesCore({
  id,
  className,
  particleColor = "rgb(37, 99, 235)",
  background = "transparent"
}: SparklesCoreProps) {
  return (
    <div id={id} className={cn("absolute inset-0 pointer-events-none", className)}>
      <div className="absolute inset-0" style={{ background }}>
        <div className="absolute inset-0 bg-repeat sparkles-pattern opacity-50" />
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
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
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SpotlightNewProps = {
  className?: string;
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
};

export const SpotlightNew = ({
  className,
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, 0.08) 0, hsla(0, 0%, 100%, 0.03) 50%, transparent 100%)",
  translateY = -500,
  width = 2000,
  height = 1500,
  smallWidth = 800,
  duration = 20,
  xOffset = 0,
}: SpotlightNewProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-100",
        className
      )}
    >
      {/* Left spotlight */}
      <div 
        className="absolute left-[calc(50%-60px)] top_1/2 -translate-x-1/2"
        style={{
          width: width,
          height: height,
          background: gradientFirst,
          transform: `translateY(${translateY}px) translateX(${-width / 4 + xOffset}px)`,
        }}
      />
      
      {/* Right spotlight */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2"
        style={{
          width: width,
          height: height,
          background: gradientSecond,
          transform: `translateY(${translateY}px) translateX(${width / 3 + xOffset}px)`,
        }}
      />
      
      {/* Center spotlight - animating */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 origin-center opacity-70"
        style={{
          width: smallWidth,
          height: smallWidth,
          background: gradientThird,
          transform: `translateY(${translateY * 0.5}px)`,
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default SpotlightNew;
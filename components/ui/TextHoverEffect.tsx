'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

interface TextHoverEffectProps {
  text: string;
  className?: string;
}

export const TextHoverEffect = ({ text, className }: TextHoverEffectProps) => {
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();
  
  // Determine if we're in dark mode
  const isDarkTheme = theme === 'dark' || resolvedTheme === 'dark';
  
  // Setup for mouse movement tracking
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  };

  // Generate a unique ID for the gradients
  const uniqueId = useRef(`text-effect-${Math.random().toString(36).substring(2, 11)}`);
  const gradientId = `gradient-${uniqueId.current}`;
  const maskId = `mask-${uniqueId.current}`;

  return (
    <div
      ref={containerRef}
      className={cn('relative h-40 w-full flex items-center justify-center overflow-hidden', className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      role="presentation"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 150"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          {/* Radial gradient for the mask */}
          <motion.radialGradient
            id={maskId}
            cx={position.x}
            cy={position.y}
            r={hovered ? 1000 : 0}
            gradientUnits="userSpaceOnUse"
            animate={{
              r: hovered ? 1000 : 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>
          
          {/* Gradient for the text */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDarkTheme ? '#60A5FA' : '#2563EB'} />
            <stop offset="100%" stopColor={isDarkTheme ? '#A78BFA' : '#7C3AED'} />
          </linearGradient>
          
          {/* Mask using the radial gradient */}
          <mask id={`textMask-${uniqueId.current}`}>
            <rect x="0" y="0" width="100%" height="100%" fill={`url(#${maskId})`} />
          </mask>
        </defs>
        
        {/* Outline text visible when not hovered */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className={cn(
            "text-6xl md:text-7xl font-bold transition-opacity duration-300",
            "fill-transparent",
            isDarkTheme ? "stroke-white/30" : "stroke-black/50"
          )}
          strokeWidth={isDarkTheme ? 0.5 : 0.7}
          style={{
            opacity: hovered ? 0 : 1,
          }}
        >
          {text}
        </text>
        
        {/* Animated stroke text */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          strokeWidth={isDarkTheme ? 0.5 : 0.7}
          className={cn(
            "text-6xl md:text-7xl font-bold",
            "fill-transparent",
            isDarkTheme ? "stroke-white/70" : "stroke-black/70"
          )}
          initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
          animate={{
            strokeDashoffset: hovered ? 0 : 1000,
            strokeDasharray: 1000,
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.text>
        
        {/* Text with gradient fill that appears when hovered */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-6xl md:text-7xl font-bold"
          fill={`url(#${gradientId})`}
          mask={`url(#textMask-${uniqueId.current})`}
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

export default TextHoverEffect;
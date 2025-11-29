'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SkillBadgeProps {
  name: string;
  icon?: string;
  color?: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category?: string;
  className?: string;
  showProficiency?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base'
};

const proficiencyColors = {
  beginner: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  intermediate: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  advanced: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
  expert: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
};

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  name,
  icon,
  color: _color,
  proficiency = 'intermediate',
  category: _category,
  className,
  showProficiency = false,
  size = 'md'
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'inline-flex items-center gap-2 rounded-full font-medium',
        'border border-gray-200 dark:border-gray-700',
        'transition-all duration-200',
        'hover:shadow-md hover:shadow-primary-500/20',
        sizeClasses[size],
        showProficiency ? proficiencyColors[proficiency] : 'bg-gray-100 dark:bg-gray-800',
        className
      )}
      role="listitem"
      aria-label={`${name} skill${showProficiency ? ` - ${proficiency} level` : ''}`}
    >
      {icon && (
        <div className="relative w-4 h-4 flex-shrink-0">
          <Image
            src={icon}
            alt=""
            fill
            className="object-contain"
            aria-hidden="true"
          />
        </div>
      )}
      <span>{name}</span>
      {showProficiency && (
        <span 
          className="text-[10px] uppercase tracking-wider opacity-70"
          aria-label={`proficiency level: ${proficiency}`}
        >
          {proficiency}
        </span>
      )}
    </motion.div>
  );
};
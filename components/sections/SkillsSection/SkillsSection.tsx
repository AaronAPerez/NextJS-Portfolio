'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { skills } from '@/components/config/skills';

const categories = [
  {
    id: 'all',
    name: 'All Skills',
    color: '#3B82F6',
    description: 'Full technology stack and tools'
  },
  {
    id: 'frontend',
    name: 'Frontend',
    color: '#EC4899',
    description: 'UI/UX & Web Technologies'
  },
  {
    id: 'backend',
    name: 'Backend',
    color: '#10B981',
    description: 'Server & Database Development'
  },
  {
    id: 'tools',
    name: 'Dev Tools',
    color: '#F59E0B',
    description: 'Development & API Tools'
  }
] as const;

interface SkillCardProps {
  name: string;
  icon: string;
  color: string;
  description?: string;
}

// Update SkillCard component
const SkillCard = ({ name, icon, color, description }: SkillCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-[112px] aspect-square cursor-pointer group" // Fixed aspect ratio and max width
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div 
          className={cn(
            "absolute w-full h-full backface-hidden rounded-xl",
            "flex flex-col items-center justify-center gap-2 p-2",
            "border backdrop-blur-sm transition-all duration-500",
            "neon-card bg-black/40"
          )}
          style={{ '--neon-color': color } as React.CSSProperties}
        >
          <div className="relative w-1/2 aspect-square"> {/* Responsive icon size */}
            <Image
              src={icon}
              alt={name}
              fill
              className={cn(
                "object-contain transition-all duration-500",
                "neon-icon"
              )}
            />
          </div>
          <span className={cn(
            "text-xs sm:text-sm font-medium text-center line-clamp-2", // Responsive text and line clamp
            "neon-text"
          )}>
            {name}
          </span>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden rounded-xl rotateY-180",
            "flex items-center justify-center p-3",
            "border backdrop-blur-sm bg-black/40",
            "neon-card"
          )}
          style={{ '--neon-color': color } as React.CSSProperties}
        >
          <p className={cn(
            "text-xs font-medium text-center line-clamp-4", // line clamp
            "neon-text"
          )}>
            {description || `${name} Development`}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillsGrid = ({ category }: { category: string }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 max-w-6xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {skills
          .filter(skill => category === 'all' || skill.category === category)
          .map((skill) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex justify-center" // Center cards in grid cells
            >
              <SkillCard {...skill} />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]['id']>('all');
  const [isFlickering, setIsFlickering] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: typeof categories[number]['id']) => {
    if (categoryId === selectedCategory) return;
    
    setIsFlickering(categoryId);
    setTimeout(() => {
      setSelectedCategory(categoryId);
      setIsFlickering(null);
    }, 1000);
  };

  return (
    <div className="relative w-full overflow-hidden min-h-screen py-20">
      {/* Background Effects */}
      <BackgroundBeams className="absolute inset-0" />

      <div className="relative z-10 container mx-auto"> 
        {/* Section Title */}
        <SectionTitle
          title="Skills & Technologies"
          subtitle="Technologies learned at CodeStack Academy and through personal projects"
        />

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
           <motion.button
           key={category.id}
           onClick={() => handleCategoryClick(category.id)}
           className={cn(
             "px-6 py-2 rounded-full backdrop-blur-sm transition-all",
             "border text-base font-medium relative overflow-hidden",
             selectedCategory === category.id
               ? "neon-border neon-text"
               : "border-white/10 text-white/70 hover:border-white/20",
             isFlickering === category.id && "neon-flicker"
           )}
           style={{ '--neon-color': category.color } as React.CSSProperties}
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
         >
           {/* Glow Effect */}
           <motion.div
             className="absolute inset-0 opacity-0 group-hover:opacity-25"
             animate={{
               background: [
                 `radial-gradient(circle at center, ${category.color}00 0%, ${category.color}00 100%)`,
                 `radial-gradient(circle at center, ${category.color}40 0%, ${category.color}00 100%)`
               ]
             }}
             transition={{
               duration: 2,
               repeat: Infinity,
               repeatType: "reverse"
             }}
           />
           {category.name}
         </motion.button>
          ))}
        </div>

        {/* Category Description */}
        <motion.p
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-400 mb-8"
        >
          {categories.find(cat => cat.id === selectedCategory)?.description}
        </motion.p>

        {/* Skills Grid */}
        <SkillsGrid category={selectedCategory} />
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />
    </div>
  );
};

export default SkillsSection;
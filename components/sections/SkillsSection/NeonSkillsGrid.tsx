'use client';

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import SkillCard from './SkillCard';
import { skills } from '@/components/config/skills';

const categories = [
  {
    id: 'all',
    name: 'All Skills',
    color: '#3B82F6',
    description: ''
  },
  {
    id: 'frontend',
    name: 'Frontend',
    color: '#FF1CF7',
    description: 'UI/UX & Web Technologies'
  },
  {
    id: 'backend',
    name: 'Backend',
    color: '#00FF00',
    description: 'Server & Database development'
  },
  {
    id: 'tools',
    name: 'Dev Tools',
    color: '#FF9B3D',
    description: 'Development & API Tools'
  },
  {
    id: 'game',
    name: 'Game Dev',
    color: '#00FFFF',
    description: 'Game Development'
  }
] as const;

export const NeonSkillsGrid = () => {
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
    <div className="relative justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-small-white/[0.02]" />
      
      {/* Category Selection */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={cn(
              "px-8 py-3 rounded-full backdrop-blur-sm transition-all",
              "border text-lg font-medium relative overflow-hidden",
              selectedCategory === category.id
                ? "neon-border neon-text"
                : "neon-border-off neon-text-off",
              isFlickering === category.id && "neon-flicker"
            )}
            style={{ '--neon-color': category.color } as React.CSSProperties}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 opacity-25"
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

      {/* Skills Grid */}
      <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <AnimatePresence mode="popLayout">
          {skills
            .filter(Skill => selectedCategory === 'all' || Skill.category === selectedCategory)
            .map((Skill) => (
              <motion.div
                key={Skill.name}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <SkillCard
                  skill={Skill}
                  isVisible={true}
                />
              </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Category Description */}
      <motion.div
        className="text-center mt-12 h-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={selectedCategory}
      >
        <p className="text-gray-400">
          {categories.find(cat => cat.id === selectedCategory)?.description}
        </p>
      </motion.div>
    </div>
  );
};

export default NeonSkillsGrid;
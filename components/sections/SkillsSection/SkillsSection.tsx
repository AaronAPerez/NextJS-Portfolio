'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from "@/lib/utils";
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
import { skills } from '@/components/config/skills';

const categories = [
  {
    id: 'all',
    name: 'All Skills',
    color: '#6366f1',
    gradient: 'from-indigo-500 to-purple-500',
    description: 'Full technology stack and tools'
  },
  {
    id: 'frontend',
    name: 'Frontend',
    color: '#ec4899',
    gradient: 'from-pink-500 to-rose-500',
    description: 'UI/UX & Web Technologies'
  },
  {
    id: 'backend',
    name: 'Backend',
    color: '#10b981',
    gradient: 'from-emerald-500 to-teal-500',
    description: 'Server & Database Development'
  },
  {
    id: 'tools',
    name: 'Dev Tools',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-500',
    description: 'Development & API Tools'
  }
] as const;

interface SkillCardProps {
  name: string;
  icon: string;
  category: string;
  description?: string;
}

// Modern SkillCard component with gradient borders
const SkillCard = ({ name, icon, category, description }: SkillCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);

  const categoryData = categories.find(cat => cat.id === category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-[112px] aspect-square cursor-pointer group"
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
        {/* Front of card - Modern gradient border */}
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={cn(
            "relative w-full h-full rounded-2xl p-[1px]",
            "bg-gradient-to-br",
            categoryData?.gradient || "from-gray-500 to-gray-700",
            "group-hover:scale-105 transition-transform duration-300"
          )}>
            <div className={cn(
              "w-full h-full rounded-2xl",
              "bg-gray-950",
              "flex flex-col items-center justify-center gap-2 p-2",
              "backdrop-blur-xl"
            )}>
              <div className="relative w-1/2 aspect-square">
                {!imageError ? (
                  <Image
                    src={icon}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 80px"
                    loading="lazy"
                    className="object-contain transition-all duration-300 group-hover:scale-110"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div
                    className={cn(
                      "w-full h-full rounded-lg flex items-center justify-center",
                      "text-white font-bold text-xl",
                      "bg-gradient-to-br",
                      categoryData?.gradient || "from-gray-500 to-gray-700"
                    )}
                  >
                    {name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-center line-clamp-2 text-white">
                {name}
              </span>
            </div>
          </div>
        </div>

        {/* Back of card - Modern design */}
        <div
          className="absolute w-full h-full"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className={cn(
            "relative w-full h-full rounded-2xl p-[1px]",
            "bg-gradient-to-br",
            categoryData?.gradient || "from-gray-500 to-gray-700"
          )}>
            <div className={cn(
              "w-full h-full rounded-2xl",
              "bg-gray-950",
              "flex items-center justify-center p-3",
              "backdrop-blur-xl"
            )}>
              <p className="text-xs font-semibold text-center line-clamp-4 text-gray-400">
                {description || `${name} Development`}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkillsGrid = React.memo(({ category }: { category: string }) => {
  const filteredSkills = React.useMemo(() =>
    skills.filter(skill => category === 'all' || skill.category === category),
    [category]
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 max-w-6xl mx-auto px-4">
      <AnimatePresence mode="wait">
        {filteredSkills.map((skill) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
            className="flex justify-center" // Center cards in grid cells
          >
            <SkillCard {...skill} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

SkillsGrid.displayName = 'SkillsGrid';

export const SkillsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]['id']>('all');

  const handleCategoryClick = (categoryId: typeof categories[number]['id']) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="relative w-full overflow-hidden min-h-screen py-20 bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Modern background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Title */}
        <SectionTitle
          title="Skills & Technologies"
          subtitle="Technologies learned at CodeStack Academy and through personal projects"
        />

        {/* Category Filters - Modern design */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={cn(
                "relative px-6 py-3 rounded-xl font-semibold transition-all duration-300",
                "border-2 overflow-hidden backdrop-blur-sm min-h-[44px]",
                selectedCategory === category.id
                  ? "text-white shadow-xl scale-105 border-transparent"
                  : "bg-gray-900/50 text-gray-300 border-gray-800 hover:border-gray-700"
              )}
              whileHover={{ scale: selectedCategory === category.id ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient background for selected state */}
              {selectedCategory === category.id && (
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-r",
                  category.gradient
                )} />
              )}
              <span className="relative z-10">{category.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Category Description */}
        <motion.p
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-400 mb-12 text-lg"
        >
          {categories.find(cat => cat.id === selectedCategory)?.description}
        </motion.p>

        {/* Skills Grid */}
        <SkillsGrid category={selectedCategory} />
      </div>
    </div>
  );
};

export default SkillsSection;
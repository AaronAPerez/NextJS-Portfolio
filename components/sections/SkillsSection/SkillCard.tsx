'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

interface SkillCardProps {
  skill: {
    id: string;
    name: string;
    icon: string;
    color: string;
    category?: string;
    description?: string;
  };
  isVisible?: boolean;
}

const SkillCard = ({ skill, isVisible = true }: SkillCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!skill) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-32 h-32 cursor-pointer"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="absolute w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden rounded-xl",
            "flex flex-col items-center justify-center gap-2",
            "border backdrop-blur-sm transition-all duration-500",
            isVisible ? "neon-card" : "neon-card-off"
          )}
          style={{ 
            '--neon-color': skill.color || '#3B82F6' 
          } as React.CSSProperties}
        >
          <div className="relative w-12 h-12">
            <Image
              src={skill.icon}
              alt={skill.name}
              width={48}
              height={48}
              className={cn(
                "w-full h-full object-contain transition-all duration-500",
                isVisible ? "neon-icon" : "opacity-50"
              )}
            />
          </div>
          <span className={cn(
            "text-sm font-medium text-center transition-all duration-500",
            isVisible ? "neon-text" : "text-gray-500"
          )}>
            {skill.name}
          </span>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            "absolute w-full h-full backface-hidden rounded-xl rotateY-180",
            "flex flex-col items-center justify-center p-4 text-center",
            "border backdrop-blur-sm",
            isVisible ? "neon-card" : "neon-card-off"
          )}
          style={{ 
            '--neon-color': skill.color || '#3B82F6'
          } as React.CSSProperties}
        >
          <p className={cn(
            "text-xs font-medium",
            isVisible ? "neon-text" : "text-gray-500"
          )}>
            {skill.description || (skill.category ? skill.category.charAt(0).toUpperCase() + skill.category.slice(1) : '')}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SkillCard;



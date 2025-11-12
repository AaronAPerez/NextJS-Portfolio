'use client';

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { forwardRef } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
}

export const Section = forwardRef<HTMLElement, SectionProps>(function Section({
  id,
  className,
  children,
  spacing = 'md',
  style
}, ref) {
  // Predefined spacing classes
  const spacingClasses = {
    none: '',
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16 lg:py-20',
    lg: 'py-16 sm:py-20 lg:py-24'
  };

  // Fade-in animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      transition={{ duration: 0.6 }}
      className={cn(
        // Base styles
        "relative w-full",
        // Spacing classes
        spacingClasses[spacing],
        // Custom classes
        className
      )}
      style={style}
    >
      {children}
    </motion.section>
  );
});
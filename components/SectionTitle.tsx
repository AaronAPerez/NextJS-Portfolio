'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import TextGenerateEffect from './ui/TextGenerateEffect';
import { SparklesCore } from "@/components/ui/sparkles-core";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle = ({ title, subtitle, className }: SectionTitleProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn('text-center mb-16 relative', className)}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 h-24 w-full">
        <SparklesCore
          id="titlesparkles"
          background="transparent"
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      {/* Title Container */}
      <div className="relative">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent blur-sm" />
        
        {/* Main Title */}   
        <h2 className="relative z-10">

        <div className="relative">
          <TextGenerateEffect
            words={title}
            className={cn(
               // heading styles
               "text-3xl sm:text-4xl md:text-5xl font-bold",
               "tracking-tight leading-tight",
               "bg-clip-text text-transparent",
            "bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400",
              "pb-4", 
              "mb-2" 
            )}
          />
          
          {/* Animated Underline */}
          <motion.div
            className="absolute bottom-0 left-1/2 h-px w-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ transform: 'translateX(-50%)' }}
          />
        </div>
        </h2>
      </div>
      
      {/* Subtitle with Enhanced Styling */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className={cn(
            "mt-6",
            "text-base sm:text-lg",
            "text-gray-600 dark:text-gray-400",
            "max-w-2xl mx-auto",
            "leading-relaxed"
          )}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Decorative Elements */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
        <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-sm" />
      </div>
    </motion.div>
  );
};

export default SectionTitle;
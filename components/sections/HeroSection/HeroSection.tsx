'use client';

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Spotlight } from '@/components/ui/Spotlight';
import TextGenerateEffect from '@/components/ui/TextGenerateEffect';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import Image from 'next/image';

export const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-[calc(100vh-5rem)] w-full flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <div className="absolute inset-0 bg-grid-small-white/[0.2] bg-grid" />
      </div>

      {/* Main Content */}
      <motion.div 
        className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Image Column */}
          <motion.div
            variants={itemVariants}
            className="flex-shrink-0"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 xl:w-72 xl:h-72">
              <Image
                src="/images/profile/headshot.png"
                alt="Aaron A. Perez - Full Stack Developer"
                fill
                priority
                className="object-cover rounded-full"
                sizes="(max-width: 768px) 192px, (max-width: 1280px) 256px, 288px"
              />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/20 to-violet-500/20 blur-2xl" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            variants={itemVariants}
            className="flex-1 max-w-2xl text-center lg:text-left"
          >
            {/* Name */}
            <h1 className={cn(
              "font-bold tracking-tight mb-4",
              "text-4xl md:text-5xl lg:text-6xl",
              "bg-clip-text text-transparent",
              "bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
            )}>
              Aaron A. Perez
            </h1>

            {/* Title */}
            <h2 className={cn(
              "font-bold mb-6",
              "text-2xl md:text-3xl lg:text-4xl",
              "bg-clip-text text-transparent",
              "bg-gradient-to-r from-blue-500 to-indigo-500"
            )}>
              Full Stack Developer
            </h2>

            {/* Description */}
            <div className="mb-8">
              <TextGenerateEffect
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300"
                words="Building modern web experiences with cutting-edge technology and a focus on creating intuitive user experiences and robust systems."
              />
            </div>

            {/* CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 px-6 py-3"
                onClick={scrollToProjects}
                aria-label="View my projects"
              >
                <span>View Projects</span>
              </HoverBorderGradient>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
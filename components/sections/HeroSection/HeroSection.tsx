'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SparklesCore } from '@/components/ui/sparkles-core';
import { Spotlight } from '@/components/ui/Spotlight';
import TextGenerateEffect from '@/components/ui/TextGenerateEffect';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import Image from 'next/image';

export const HeroSection = () => {
    const scrollToProjects = () => {
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex justify-center mx-auto">
            {/* Background Effects */}
            <Spotlight
                className="top-40 -left-10 md:-left-32 md:-top-20 h-screen"
                fill="white"
            />
            <div className="absolute inset-0 bg-grid-small-white/[0.2] bg-grid" />
            <div className="absolute inset-0 backdrop-blur-sm" />

            <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8
        max-w-7xl xl:max-w-8xl 2xl:max-w-9xl 3xl:max-w-screen-2xl">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Image Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2,
                            ease: "easeOut"
                        }}
                        className="relative"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
                            <Image
                                src="/images/profile/headshot.png"
                                alt="Aaron A. Perez Portfolio Image"
                                role="img"
                                fill
                                priority
                                className="object-cover rounded-full"
                            />
                            <div className="absolute inset-0" />
                        </div>
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full blur-2xl opacity-20" />
                    </motion.div>

                    {/* Text Content Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="text-center lg:text-left space-y-8 lg:flex-1"
                    >
                        {/* Name and Title */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-bold">
                                Aaron A. Perez
                            </h1>
                            <TextGenerateEffect
                                className="text-[40px] md:text-3xl lg:text-4xl"
                                words="Full Stack Developer"
                            />
                        </div>

                        {/* Description */}
                        <h3 className="text-lg max-w-2xl mx-auto lg:mx-0">
                            Building modern web experiences with cutting-edge technology and a focus on
                            creating intuitive user experiences and robust systems.
                        </h3>

                        {/* CTA Button */}
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                            onClick={scrollToProjects}
                            aria-label="Scroll to projects section"
                        >
                            <span>View Projects</span>
                        </HoverBorderGradient>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import SectionTitle from '@/components/SectionTitle';
import { CardBody, CardContainer, CardItem } from './CardContainer';
import Meteors from '@/components/ui/meteors';

const aboutContent = {
  title: "About Me",
  background: `I am a Full Stack Developer with a solid foundation in IT, currently expanding my development skills through CodeStack Academy. My journey in technology began with an Applied Science Degree in Network Systems Administration & BS in Information Systems and Cyber Security from ITT Technical Institute, where I graduated with a 3.5 GPA.`,
  approach: `I am passionate about creating intuitive user experiences and robust applications. My combined background in IT support and full-stack development training gives me a unique perspective on building user-friendly applications that solve real-world problems. I've applied these skills in various projects at CodeStack Academy, including expense tracking applications, business websites, and web-based games.`
};

const AboutSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-8xl mx-auto"
      >
        {/* Section Title */}
        <SectionTitle
          title={aboutContent.title}
          subtitle="Full stack developer with a passion for building intuitive and robust applications"
        />

        {/* Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-12">
          {/* Background Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full h-full"
          >
            <CardContainer className="w-full h-full" containerClassName="w-full h-full">
              <CardBody 
                className={cn(
                  "relative bg-black/80",
                  "group/card dark:hover:shadow-2xl dark:hover:shadow-blue-500/[0.1]",
                  "dark:border-white/[0.2] border-black/[0.1]",
                  "w-full h-full rounded-xl pr-16 py-4 border",
                  "hover:border-blue-500/50 transition-all duration-500",
                  "flex flex-col"
                )}
              >
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-200 dark:text-white mb-4"
                >
                  Background
                </CardItem>
                <CardItem
                  as="div"
                  translateZ="50"
                  className="flex-grow overflow-y-auto"
                >
                  <p className="text-neutral-300 dark:text-neutral-200 text-sm leading-relaxed">
                    {aboutContent.background}
                  </p>
                </CardItem>
                <Meteors number={10} />
              </CardBody>
            </CardContainer>
          </motion.div>

          {/* Approach Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full h-full"
          >
            <CardContainer className="w-full h-full" containerClassName="w-full h-full">
              <CardBody 
                className={cn(
                  "relative bg-black/80",
                  "group/card dark:hover:shadow-2xl dark:hover:shadow-violet-500/[0.1]",
                  "dark:border-white/[0.2] border-black/[0.1]",
                  "w-full h-full rounded-xl pr-16 py-4 border",
                  "hover:border-violet-500/50 transition-all duration-500",
                  "flex flex-col"
                )}
              >
                <CardItem
                  translateZ="50"
                  className="text-xl font-bold text-neutral-200 dark:text-white mb-4"
                >
                  Approach
                </CardItem>
                <CardItem
                  as="div"
                  translateZ="50"
                  className="flex-grow overflow-y-auto"
                >
                  <p className="text-neutral-300 dark:text-neutral-200 text-sm leading-relaxed">
                    {aboutContent.approach}
                  </p>
                </CardItem>
                <Meteors number={10} className="opacity-50" />
              </CardBody>
            </CardContainer>
          </motion.div>
        </div>
      </motion.div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />
    </section>
  );
};

export default AboutSection;
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import SectionTitle from '@/components/SectionTitle';
import { CardBody, CardContainer, CardItem } from './CardContainer';

const aboutContent = {
  background: {
    title: "Background",
    content: `I am a Full Stack Developer with a solid foundation in IT, currently expanding my development skills through CodeStack Academy. My journey in technology began with an Applied Science Degree in Network Systems Administration & BS in Information Systems and Cyber Security from ITT Technical Institute, where I graduated with a 3.5 GPA.`
  },
  approach: {
    title: "Approach",
    content: `I am passionate about creating intuitive user experiences and robust applications. My combined background in IT support and full-stack development training gives me a unique perspective on building user-friendly applications that solve real-world problems. I've applied these skills in various projects at CodeStack Academy, including expense tracking applications, business websites, and web-based games.`
  }
};

// Meteor component with continuous animation
const Meteors = ({ number }: { number: number }) => {
  const meteors = new Array(number || 20).fill(true);
  return (
    <>
      {meteors.map((el, idx) => (
        <motion.span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-500 rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2",
            "before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
          )}
          style={{
            top: 0,
            left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
        />
      ))}
    </>
  );
};

// Card component with continuous meteor effect
const InfoCard = ({ title, content, delay, className }: {
  title: string;
  content: string;
  delay: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="w-full h-full"
    >
      <CardContainer className="h-full">
        <CardBody
          className={cn(
            "relative bg-black/80 h-full",
            "group/card dark:hover:shadow-2xl",
            "dark:border-white/[0.2] border-black/[0.1]",
            "rounded-xl p-6 border",
            "hover:border-slate-500/50 transition-all duration-500",
            "flex flex-col",
            className
          )}
        >
          <CardItem
            className="text-xl font-bold text-neutral-200 dark:text-white mb-4"
          >
            {title}
          </CardItem>
          <CardItem
            className="text-neutral-300 dark:text-neutral-200 text-sm leading-relaxed"
          >
            {content}
          </CardItem>

          {/* Continuous Meteor Effect */}
          <div className="absolute inset-0 overflow-hidden rounded-xl">
            <Meteors number={8} />
          </div>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
};

export const AboutSection = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative z-10">
        <SectionTitle
          title="About Me"
          subtitle="Full stack developer with a passion for building intuitive and robust applications"
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InfoCard
            title={aboutContent.background.title}
            content={aboutContent.background.content}
            delay={0.2}
            className="dark:hover:shadow-blue-500/[0.1]"
          />
          <InfoCard
            title={aboutContent.approach.title}
            content={aboutContent.approach.content}
            delay={0.3}
            className="dark:hover:shadow-violet-500/[0.1]"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
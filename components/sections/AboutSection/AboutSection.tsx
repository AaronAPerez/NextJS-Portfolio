'use client';

import React from 'react';
import { motion } from 'framer-motion';

import SectionTitle from '@/components/SectionTitle';


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

// Meteor component with optimized continuous animation
// const Meteors = ({ number }: { number: number }) => {
//   const meteors = React.useMemo(() => new Array(number || 12).fill(true), [number]);
//   return (
//     <>
//       {meteors.map((el, idx) => (
//         <motion.span
//           key={"meteor" + idx}
//           className={cn(
//             "animate-meteor-effect absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-500 rotate-[215deg]",
//             "before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2",
//             "before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
//           )}
//           style={{
//             top: 0,
//             left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
//             animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
//             animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
//           }}
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true, margin: "100px" }}
//         />
//       ))}
//     </>
//   );
// };

// Modern card component with gradient borders - optimized to prevent layout shift
const InfoCard = ({ title, content, delay, gradient }: {
  title: string;
  content: string;
  delay: number;
  gradient: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="w-full h-full group"
    >
      <div className={`relative p-[1px] rounded-2xl bg-gradient-to-br ${gradient} group-hover:scale-[1.02] transition-transform duration-300`}>
        <div className="relative bg-gray-950 rounded-2xl p-8 h-full backdrop-blur-xl min-h-[240px]">
          {/* Fixed height title to prevent layout shift */}
          <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 min-h-[2rem]">
            {title}
          </h3>

          {/* Fixed minimum height for content */}
          <p className="text-gray-400 text-base leading-normal min-h-[120px]">
            {content}
          </p>

          {/* Hover glow effect */}
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br ${gradient} blur-xl -z-10`} />
        </div>
      </div>
    </motion.div>
  );
};

export const AboutSection = () => {
  return (
    <div className="relative w-full overflow-hidden py-20 bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="About Me"
          subtitle="Full stack developer with a passion for building intuitive and robust applications"
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <InfoCard
            title={aboutContent.background.title}
            content={aboutContent.background.content}
            delay={0.2}
            gradient="from-indigo-500 via-purple-500 to-pink-500"
          />
          <InfoCard
            title={aboutContent.approach.title}
            content={aboutContent.approach.content}
            delay={0.4}
            gradient="from-teal-500 via-cyan-500 to-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
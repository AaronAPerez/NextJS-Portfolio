'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { BackgroundBeams } from '@/components/ui/background-beams';

import { CardBody, CardContainer, CardItem } from './CardContainer';
import SectionTitle from '@/components/SectionTitle';



const aboutContent = {
  title: "About Me",
  background: `I am a Full Stack Developer with a solid foundation in IT, currently expanding my development skills through CodeStack Academy. My journey in technology began with an Applied Science Degree in Network Systems Administration & BS in Information Systems and Cyber Security from ITT Technical Institute, where I graduated with a 3.5 GPA.`,
  approach: `I am passionate about creating intuitive user experiences and robust applications. My combined background in IT support and full-stack development training gives me a unique perspective on building user-friendly applications that solve real-world problems. I've applied these skills in various projects at CodeStack Academy, including expense tracking applications, business websites, and web-based games.`
};

// const aboutContent = {
//   title: "About Me",
//   introduction: `I am a Full Stack Developer with a solid foundation in IT, currently expanding my development skills through CodeStack Academy. My journey in technology began with an Applied Science Degree in Network Systems Administration & BS in Information Systems and Cyber Security from ITT Technical Institute, where I graduated with a 3.5 GPA.`,

//   experience: `In my current role at San Joaquin County Office of Education, I provide technical support and help desk services to school districts while pursuing my passion for full-stack development. Through CodeStack Academy, I've been building various web applications and expanding my programming expertise.`,

//   technical: [
//     'Frontend: React, TypeScript, Next.js, HTML5, CSS3, JavaScript',
//     'Backend: C#, .NET, SQL Server, Entity Framework',
//     'Tools: VS Code, Azure, API Development',
//     'Web Design: Tailwind CSS, Bootstrap, Responsive Design'
//   ],

//   approach: `I am passionate about creating intuitive user experiences and robust applications. My combined background in IT support and full-stack development training gives me a unique perspective on building user-friendly applications that solve real-world problems.`
// };

const AboutSection = () => {
  return (
    <>
      <BackgroundBeams className="absolute inset-0"/>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          {/* Section Title */}
          <SectionTitle
            title={aboutContent.title}
            subtitle="Full stack developer with a passion for building intuitive and robust applications"
          />

          {/* Content Cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Background Card */}
            <CardContainer className="w-full" containerClassName={''}>
              <CardBody className="bg-black/80 relative group/card dark:hover:shadow-2xl dark:hover:shadow-blue-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-full rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="m-2 text-xl font-bold text-neutral-200 dark:text-white mb-4"
                >
                  Background
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="m-2 text-neutral-300 dark:text-neutral-200 text-sm max-w-sm mt-2 leading-relaxed"
                >
                  {aboutContent.background}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
                  >
                    {/* <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                      Learn More →
                    </span> */}
                  </motion.button>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Approach Card */}
            <CardContainer className="w-full" containerClassName={''}>
              <CardBody className="bg-black/80 relative group/card dark:hover:shadow-2xl dark:hover:shadow-violet-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-full rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="m-2 text-xl font-bold text-neutral-200 dark:text-white mb-4"
                >
                  Approach
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="m-2 text-neutral-300 dark:text-neutral-200 text-sm max-w-sm mt-2 leading-relaxed"
                >
                  {aboutContent.approach}
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
                  >
                    {/* <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                      See Projects →
                    </span> */}
                  </motion.button>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
          {/* 
          {/* Stats *
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            <StatCard
              number="5+"
              label="Years Experience"
              gradientFrom="from-blue-500"
              gradientTo="to-violet-500"
            />
            <StatCard
              number="100+"
              label="Projects Completed"
              gradientFrom="from-violet-500"
              gradientTo="to-blue-500"
            />
            <StatCard
              number="1000+"
              label="Support Tickets"
              gradientFrom="from-blue-500"
              gradientTo="to-violet-500"
            />
            <StatCard
              number="12+"
              label="Tech Stack"
              gradientFrom="from-violet-500"
              gradientTo="to-blue-500"
            />
          </motion.div> */}
        </motion.div>
      </div>
    </>
  );
};

export default AboutSection;
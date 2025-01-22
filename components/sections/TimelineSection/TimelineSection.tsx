'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import SectionTitle from '@/components/SectionTitle';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';

const timelineData = {
  education: [
    {
      title: "Full Stack Development",
      institution: "CodeStack Academy",
      period: "2023 - 2024",
      details: [
        "Frontend Development: React, TypeScript, Next.js, Tailwind CSS",
        "Backend Development: C#, .NET, SQL Server",
        "Tools & Technologies: Git, Azure, VS Code",
        "Built multiple full-stack applications including expense trackers, game databases, and business websites"
      ]
    },
    {
      title: "BS Information Systems & Cyber Security",
      institution: "ITT Technical Institute",
      period: "Graduated 2016",
      details: ["Network Systems Administration", "Information Security", "GPA: 3.5"]
    }
  ],
  experience: [
    {
      title: "User Support Specialist",
      company: "San Joaquin County Office of Education - CodeStack",
      period: "2017 - Present",
      details: [
        "QA testing and validation for educational software systems",
        "Technical support and troubleshooting for SEIS platform",
        "Compliance validation and data quality assurance",
        "Help desk support and ticket management using Freshdesk and Zoho"
      ]
    },
    {
      title: "Information Systems Analyst",
      company: "San Joaquin County - Information Systems Division",
      period: "2017",
      details: [
        "Help desk support for county employees",
        "Workstation setup and maintenance",
        "Technical troubleshooting and issue resolution",
        "User account management and software support"
      ]
    }
  ]
};

interface TimelineCardProps {
  title: string;
  company?: string;
  institution?: string;
  period: string;
  details: string[];
  delay?: number;
}

const TimelineCard: React.FC<TimelineCardProps> = ({
  title,
  company,
  institution,
  period,
  details,
  delay = 0
}) => {
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <HoverBorderGradient
        containerClassName="w-full rounded-xl"
        className={cn(
          "relative p-8 h-full",
          "bg-black/40 backdrop-blur-sm",
          "border border-white/[0.08]",
          "group transition duration-300"
        )}
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-2">
              {title}
            </h3>
            <div className="text-sm text-blue-400">
              {company || institution}
            </div>
            <div className="text-sm text-gray-400">
              {period}
            </div>
          </div>

          {/* Details */}
          <ul className="space-y-3">
            {details.map((detail, idx) => (
              <li 
                key={idx}
                className="flex items-start space-x-2 text-sm text-gray-300"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </HoverBorderGradient>
    </motion.div>
    </>
  );
};

export const TimelineSection = () => {
  return (
    <>
      {/* Background Effects */}
      <BackgroundBeams className="absolute inset-0" />

      <div className="relative z-10">
        {/* Section Title */}
        <SectionTitle
          title="Experience & Education"
          subtitle="My professional journey and academic background"
        />

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Education Column */}
          <div>
            <h2 className={cn(
              "text-2xl font-bold mb-8 text-center",
              "bg-clip-text text-transparent",
              "bg-gradient-to-r from-blue-500 to-purple-500"
            )}>
              Education
            </h2>
            <div className="space-y-6">
              {timelineData.education.map((item, index) => (
                <TimelineCard
                  key={`education-${index}`}
                  {...item}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>

          {/* Experience Column */}
          <div>
            <h2 className={cn(
              "text-2xl font-bold mb-8 text-center",
              "bg-clip-text text-transparent",
              "bg-gradient-to-r from-blue-500 to-purple-500"
            )}>
              Work Experience
            </h2>
            <div className="space-y-6">
              {timelineData.experience.map((item, index) => (
                <TimelineCard
                  key={`experience-${index}`}
                  {...item}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />
    </>
  );
};

export default TimelineSection;

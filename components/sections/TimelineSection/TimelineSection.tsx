'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";
import { Spotlight } from '@/components/ui/Spotlight';
import SectionTitle from '@/components/SectionTitle';

interface TimelineItemData {
  title: string;
  institution?: string;
  company?: string;
  period: string;
  details: string[];
}

interface TimelineItemProps {
  data: TimelineItemData;
  isLeft: boolean;
  delay: number;
}

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

export const TimelineSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-10">
        <SectionTitle
          title="Experience & Education"
          subtitle="My professional journey and academic background"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Education</h3>
            <div className="space-y-8">
              {timelineData.education.map((item, index) => (
                <TimelineItem
                  key={`education-${index}`}
                  data={item}
                  isLeft={true}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>

          {/* Work Experience Timeline */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">Work Experience</h3>
            <div className="space-y-8">
              {timelineData.experience.map((item, index) => (
                <TimelineItem
                  key={`experience-${index}`}
                  data={item}
                  isLeft={false}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ data, isLeft, delay }: TimelineItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative p-6 rounded-xl backdrop-blur-sm",
        "border border-white/10 bg-white/5",
        "hover:bg-white/10 transition-colors"
      )}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-violet-500 rounded-l-xl" />

      <h4 className="text-xl font-bold mb-2">{data.title}</h4>
      <p className="text-blue-400 mb-1">{data.institution || data.company}</p>
      <p className="text-sm mb-4">{data.period}</p>

      <ul className="space-y-2">
        {data.details.map((detail, index) => (
          <li key={index} className="text-sm text-gray-300">
            • {detail}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TimelineSection;

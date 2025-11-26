'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from "@/components/sections/HeroSection";
import SectionLoader from "@/components/ui/SectionLoader";
import { LearningSection } from '@/components/sections/LearningSection';
import { Skills } from '@/components/sections/Skills';





// Optimized lazy loading with ssr disabled for heavy components
const AboutSection = dynamic(() => import("@/components/sections/AboutSection/AboutSection"), {
  loading: () => <SectionLoader />,
  ssr: false
});

// const SkillsSection = dynamic(() => import("@/components/sections/Skills"), {
//   loading: () => <SectionLoader />,
//   ssr: false
// });


const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection/ProjectsSection"), {
  loading: () => <SectionLoader />,
  ssr: false
});

const Timeline = dynamic(() => import("@/components/sections/Timeline"), {
  loading: () => <SectionLoader />,
  ssr: false
});

const ContactSection = dynamic(() => import("@/components/sections/ContactSection/ContactSection"), {
  loading: () => <SectionLoader />,
  ssr: false
});

export default function Home() {
  return (
    <>

        {/* Hero Section - Above the fold, strong first impression */}
        <section
          id="home"
          className="relative bg-white-100 dark:bg-gray-950"
          aria-labelledby="hero-heading"
        >
          <HeroSection />
        </section>

      {/* About Section */}
      <section id="about" className="bg-white-100 dark:bg-gray-950">
        <AboutSection />
      </section>

         {/* Skills Section - Show capabilities immediately */}
        <section
          id="skills"
          className="relative bg-white-100 dark:bg-gray-950"
          aria-labelledby="skills-heading"
        >
          <Skills/>
        </section>

      {/* AI Showcase Section */}
      <section id="learning section" className="bg-white-100 dark:bg-gray-950">
        <LearningSection/>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-white-100 dark:bg-gray-950">
        <ProjectsSection />
      </section>

      {/* Experience Section */}
      <section id="experience" className="bg-white-100 dark:bg-gray-950">
        <Timeline />
      </section>


        {/* Contact Section - End with clear CTA */}
        <section
          id="contact"
          className="relative bg-white-100 dark:bg-gray-950"
          aria-labelledby="contact-heading"
        > 
          <ContactSection />
        </section>
          
    </>
  );
}

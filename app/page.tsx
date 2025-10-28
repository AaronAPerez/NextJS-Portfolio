'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from "@/components/sections/HeroSection";
import SectionLoader from "@/components/ui/SectionLoader";
import Footer from '@/components/layout/Footer';

// Optimized lazy loading with ssr disabled for heavy components
const AboutSection = dynamic(() => import("@/components/sections/AboutSection/AboutSection"), {
  loading: () => <SectionLoader />,
  ssr: false
});

const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection/SkillsSection"), {
  loading: () => <SectionLoader />,
  ssr: false
});

const AIShowcase = dynamic(() => import("@/components/sections/AIShowcase/AIShowcase"), {
  loading: () => <SectionLoader />,
  ssr: false
});

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection/ProjectsSection"), {
  loading: () => <SectionLoader />,
  ssr: false
});

const TimelineSection = dynamic(() => import("@/components/sections/TimelineSection").then(mod => ({ default: mod.TimelineSection })), {
  loading: () => <SectionLoader />,
  ssr: false
});

const ContactSection = dynamic(() => import("@/components/sections/ContactSection"), {
  loading: () => <SectionLoader />,
  ssr: false
});

export default function Home() {
  return (
    <>

        {/* Hero Section - Above the fold, strong first impression */}
        <section
          id="home"
          className="relative"
          aria-labelledby="hero-heading"
        >
          <HeroSection />
        </section>

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>

         {/* Skills Section - Show capabilities immediately */}
        <section
          id="skills"
          className="relative"
          aria-labelledby="skills-heading"
        >
          <SkillsSection />
        </section>

      {/* AI Showcase Section */}
      <section id="ai-showcase">
        <AIShowcase />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <ProjectsSection />
      </section>

      {/* Experience Section */}
      <section id="experience">
        <TimelineSection />
      </section>
        {/* Contact Section - End with clear CTA */}
        <section
          id="contact"
          className="relative"
          aria-labelledby="contact-heading"
        >
          <ContactSection />
        </section>

                {/* Footer */}
        <footer role="contentinfo">
          <Footer />
        </footer>
    </>
  );
}

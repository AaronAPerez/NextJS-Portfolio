'use client';

import dynamic from 'next/dynamic';
import HeroSection from "@/components/sections/HeroSection";
import {
  AboutSkeleton,
  SkillsSkeleton,
  ProjectsSkeleton,
  TimelineSkeleton,
  ContactSkeleton
} from "@/components/sections/skeletons";
// import { AIChat } from '@/components/AIAssistant/AIChat';

// New sections for recruiter appeal
// const ImpactMetricsStrip = dynamic(() => import("@/components/sections/ImpactMetricsStrip"), {
//   ssr: false
// });

const WhyHireMe = dynamic(() => import("@/components/sections/WhyHireMe"), {
  ssr: false
});

// Optimized lazy loading with section-specific skeletons for better UX
const AboutSection = dynamic(() => import("@/components/sections/AboutSection/AboutSection"), {
  loading: () => <AboutSkeleton />,
  ssr: false
});

const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), {
  loading: () => <SkillsSkeleton />,
  ssr: false
});

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection/ProjectsSection"), {
  loading: () => <ProjectsSkeleton />,
  ssr: false
});

const Timeline = dynamic(() => import("@/components/sections/Timeline"), {
  loading: () => <TimelineSkeleton />,
  ssr: false
});

const ContactSection = dynamic(() => import("@/components/sections/ContactSection/ContactSection"), {
  loading: () => <ContactSkeleton />,
  ssr: false
});

export default function Home() {
  return (
    <>
      <div>
        {/* Hero Section - Above the fold, strong first impression */}
        <section
          id="home"
          aria-labelledby="hero-heading"
        >

          <HeroSection />

        </section>

        {/* Impact Metrics Strip - Immediately show provable results to recruiters */}
        {/* <ImpactMetricsStrip /> */}

        {/* About Section */}
        <section id="about"
          aria-label="about-section">

          <AboutSection />

        </section>

        {/* Skills Section - Show capabilities immediately */}
        <section
          id="skills"
          className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          aria-labelledby="skills-heading"
        >

          <SkillsSection />

        </section>

        {/* Projects Section */}
        <section id="projects"
          aria-label="projects-section">
          <ProjectsSection />
        </section>


        {/* Experience Section */}
        <section id="experience"
          aria-label="experience-section">
          <Timeline />
        </section>

        {/* Why Hire Me - Direct appeal to recruiters before contact */}
        
        <WhyHireMe />

        {/* Contact Section CTA */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
        >
          <ContactSection />
        </section>
      </div>

      {/* AI Chat Assistant - Floating widget for visitor questions */}
      {/* <AIChat /> */}
    </>
  );
}

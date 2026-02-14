'use client';

import dynamic from 'next/dynamic';
import { EditorWrapper } from "@/components/EditorWrapper";
import HeroSection from "@/components/sections/HeroSection";
import {
  AboutSkeleton,
  SkillsSkeleton,
  ProjectsSkeleton,
  TimelineSkeleton,
  ContactSkeleton
} from "@/components/sections/skeletons";


// Optimized lazy loading with section-specific skeletons for better UX
const AboutSection = dynamic(() => import("@/components/sections/AboutSection/AboutSection"), {
  loading: () => <AboutSkeleton />,
  ssr: false
});

const Skills = dynamic(() => import("@/components/sections/Skills"), {
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
          <EditorWrapper id="Hero" order={0}>
            <HeroSection />
          </EditorWrapper>
        </section>

        {/* About Section */}
        <section id="about"
          aria-label="about-section">
          <EditorWrapper id="Projects" order={1}>
            <AboutSection />
          </EditorWrapper>
        </section>

        {/* Skills Section - Show capabilities immediately */}
        <section
          id="skills"
          aria-labelledby="skills-heading"
        >
          <EditorWrapper id="Contact" order={2}>
            <Skills />
          </EditorWrapper>
        </section>

        {/* Projects Section */}
        <section id="projects"
          aria-label="projects-section">
          <EditorWrapper id="Projects" order={3}>
            <ProjectsSection />
          </EditorWrapper>
        </section>


        {/* Experience Section */}
        <section id="experience"
          aria-label="experience-section">
          <EditorWrapper id="Timeline" order={4}>
            <Timeline />
          </EditorWrapper>
        </section>

        {/* Contact Section CTA */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
        >
          <ContactSection />
        </section>
      </div>
    </>
  );
}

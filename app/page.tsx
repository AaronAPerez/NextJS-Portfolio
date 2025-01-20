import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import LoadingSpinner from "@/components/LoadingSpinner";
import AboutSection from "@/components/sections/AboutSection/AboutSection";
import ContactSection from "@/components/sections/ContactSection/ContactSection";
import HeroSection from "@/components/sections/HeroSection/HeroSection";

import SkillsSection from "@/components/sections/SkillsSection/SkillsSection";
import TimelineSection from "@/components/sections/TimelineSection/TimelineSection";
import { SparklesCore } from "@/components/ui/sparkles-core";

import dynamic from 'next/dynamic';

const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection/ProjectsSection'), {
  loading: () => <LoadingSpinner />
});

export const dynamicMode = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Home() {
  return (
    <>
      <main className="min-h-screen
      text-neutral-200 dark:text-white
      bg-white dark:bg-black/[0.96] 
      antialiased relative overflow-hidden 
      justify-center align-middle">
        {/* Background Effects */}
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            className="w-full h-full"
            particleColor="currentColor"
          />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl xl:max-w-8xl 2xl:max-w-9xl 3xl:max-w-screen-2xl">

          {/* Hero/Overview Section */}
          <Section id="hero" 
          className="flex justify-center align-middle"
          fullWidth>
            <HeroSection />
   
          </Section>

          {/* About Section */}
          <Section id="about">
            <Container size="lg">
              <AboutSection />
            </Container>
          </Section>

          {/* About Section */}
          <section id="skills" className="min-h-screen py-10">
            <SkillsSection />
          </section>

          {/* Projects Section */}
          <section id="projects" className="min-h-screen py-10">
            <ProjectsSection />
          </section>
       

        
          {/* Experience Section */}
          <section id="experience" className="min-h-screen py-10">
            <TimelineSection />
          </section>
        </div>
        {/* Contact Section with Social Links */}
        <section id="contact" className="min-h-screen pt-10">
          <ContactSection />
        </section>
      </main>
    </>
  );
}

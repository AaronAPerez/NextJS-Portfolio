import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import LoadingSpinner from "@/components/LoadingSpinner";
import AboutSection from "@/components/sections/AboutSection/AboutSection";
import ContactSection from "@/components/sections/ContactSection/ContactSection";
import HeroSection from "@/components/sections/HeroSection/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection/SkillsSection";
import TimelineSection from "@/components/sections/TimelineSection/TimelineSection";


import dynamic from 'next/dynamic';

const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection/ProjectsSection'), {
  loading: () => <LoadingSpinner />
});

export const dynamicMode = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Home() {
  return (
    <>
      {/* Main Content Container */}
      <Container as="div" className="relative z-10">

        {/* Hero/Overview Section */}
        <Section id="home" spacing="none">
          <HeroSection />
        </Section>

        {/* About Section */}
        <Section id="about">
          <AboutSection />
        </Section>

        {/* About Section */}
        <section 
        id="skills"     
        className="custom-classes" 
        >
          <SkillsSection />
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-10">
          <ProjectsSection />
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-6">
          <TimelineSection />
        </section>


        {/* Contact Section with Social Links */}
        <section id="contact" className="py-20">
          <ContactSection />
        </section>

      </Container>
    </>
  );
}

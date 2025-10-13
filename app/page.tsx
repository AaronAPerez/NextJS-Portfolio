import AboutSection from "@/components/sections/AboutSection/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection/ProjectsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";

export const dynamicMode = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Home() {
  return (
    <>
      {/* Hero/Overview Section */}
      <section id="home">
        <HeroSection />
      </section>

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Skills Section */}
      <section id="skills">
        <SkillsSection />
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <ProjectsSection />
      </section>

      {/* Experience Section */}
      <section id="experience">
        <TimelineSection />
      </section>

      {/* Contact Section with Social Links */}
      <section id="contact">
        <ContactSection />
      </section>
    </>
  );
}

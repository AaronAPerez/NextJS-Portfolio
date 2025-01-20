import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/AboutSection/AboutSection";
import ContactSection from "@/components/sections/ContactSection/ContactSection";
import HeroSection from "@/components/sections/HeroSection/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection/SkillsSection";
import TimelineSection from "@/components/sections/TimelineSection/TimelineSection";
import { SparklesCore } from "@/components/ui/sparkles-core";
import TracingBeam from "@/components/ui/tracing-beam";


export const dynamic = "force-dynamic";
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
        <TracingBeam className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl xl:max-w-8xl 2xl:max-w-9xl 3xl:max-w-screen-2xl">
          {/* Hero/Overview Section */}
          <section id="home" className="min-h-screen">
            <HeroSection />
          </section>
          {/* About Section */}
          <section id="about" className="min-h-screen py-10">
            <AboutSection />
          </section>
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
        </TracingBeam>
        {/* Contact Section with Social Links */}
        <section id="contact" className="min-h-screen pt-10">
          <ContactSection />
        </section>
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
}

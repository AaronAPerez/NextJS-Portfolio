import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/sections/HeroSection';

import { AboutSkeleton, ContactSkeleton, ProjectsSkeleton, SkillsSkeleton, TimelineSkeleton } from '@/components/sections/skeletons';
import CtaSection from '@/components/sections/CTASection';

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Aaron Perez — Full Stack Developer',
  description:
    'Full Stack Developer specializing in Next.js, TypeScript, and React. 7+ years IT background. Building fast, accessible production sites for real businesses.',
  openGraph: {
    title: 'Aaron Perez — Full Stack Developer',
    description:
      'Full Stack Developer specializing in Next.js, TypeScript, and React. 4 live production sites. Available for full-time, contract, and freelance work.',
    url: 'https://aaronaperez.dev',
    siteName: 'Aaron Perez Portfolio',
    type: 'website',
  },
};

// Optimized lazy loading with section-specific skeletons for better UX
const AboutSection = dynamic(() => import("@/components/sections/AboutSection"), {
  loading: () => <AboutSkeleton />
});

const SkillsSection = dynamic(() => import("@/components/sections/SkillsSection"), {
  loading: () => <SkillsSkeleton />
});

const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection/ProjectsSection"), {
  loading: () => <ProjectsSkeleton />
});

const Timeline = dynamic(() => import("@/components/sections/Timeline"), {
  loading: () => <TimelineSkeleton />
});

const ContactSection = dynamic(() => import("@/components/sections/ContactSection/ContactSection"), {
  loading: () => <ContactSkeleton />
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







       {/* Projects Section */}
        <section id="projects"
          aria-label="projects-section">
          <ProjectsSection />
        </section>

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

 


        {/* Experience Section */}
        {/* <section id="experience"
          aria-label="experience-section">
          <Timeline />
        </section> */}


        {/* Contact Section CTA */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
        >
          <ContactSection />
        </section>


        {/* Contact Section CTA */}
        <section
          id="cta"
          aria-labelledby="cta-section"
        >
              {/* 5. CTA */}
      <CtaSection />
        </section>




      </div>

      {/* AI Chat Assistant - Floating widget for visitor questions */}
      {/* <AIChat /> */}
    </>
  );
}

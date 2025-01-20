import AboutSection from "@/components/sections/AboutSection/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection/SkillsSection";
import { FloatingNav } from "@/components/ui/FloatingNav";
import Hero from "@/components/ui/Hero";
import { navItems } from "@/data";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Home() {
  return (
    // <TracingBeam>/


    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-hidden">
      <div className="max-w-7xl w-full ">
   
        <FloatingNav navItems={navItems} />
        <Hero />
        <AboutSection/>
        <SkillsSection/>

      </div>
    </main>
  );
}

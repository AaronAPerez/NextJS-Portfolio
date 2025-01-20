// import Footer from "@/components/Footer";
// import Clients from "@/components/Clients";

// import Footer from "@/components/Footer";

import { FloatingNav } from "@/components/ui/FloatingNav";
import Hero from "@/components/ui/Hero";
// import { MatrixCard } from "@/components/ui/MatrixCard";

import { navItems } from "@/data";
// import { Suspense } from "react";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default function Home() {
  return (
    // <TracingBeam>/


    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-hidden">
      <div className="max-w-7xl w-full ">
   
        <FloatingNav navItems={navItems} />
        <Hero />
        {/* <Grid />
        <SkillsSection/>
        <RecentProjects />
        <Clients />
        <MatrixCard /> */}
        {/* <Footer /> */}

      </div>
    </main>
  );
}

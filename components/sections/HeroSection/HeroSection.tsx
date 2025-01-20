// 'use client';

// import React from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { cn } from "@/lib/utils";

// import { Spotlight } from '@/components/ui/Spotlight';
// import { skills } from '@/components/config/skills';
// import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';




// // Featured skills for hero section
// export const featuredSkills = skills.filter(skill =>
//   ['React', 'TypeScript', 'Next.js', 'C#', '.NET', 'SQL Server'].includes(skill.name)
// );

// const words = [
//   { text: "Full" },
//   { text: "Stack" },
//   { text: "Developer" },
// ];

// export const HeroSection = () => {
//   return (
//     <section className="relative min-h-screen flex items-center justify-center p-8">
//       <div className={cn(
//         "bg-white rounded-xl dark:bg-zinc-900",
//         "text-zinc-900 dark:text-white",
//         "border-black/10 dark:border-white/10"
//       )}>
//         {/* Background Effects */}
//         <Spotlight
//           className="-top-40 left-0 md:left-60 md:-top-20"
//           fill="white"
//         />
//         <div className="absolute inset-0 bg-grid-small-white/[0.2] bg-grid" />
//         <div className="absolute inset-0 backdrop-blur-sm" />

//         <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8
//                 max-w-7xl xl:max-w-8xl 2xl:max-w-9xl 3xl:max-w-screen-2xl">
//           <div className="flex flex-col lg:flex-row items-center gap-12">
//             {/* Image Column */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.5 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{
//                 duration: 0.5,
//                 delay: 0.2,
//                 ease: "easeOut"
//               }}
//               className="relative"
//             >
//               <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden">
//                 <Image
//                   src="/images/profile/headshot.png"
//                   alt="Aaron A. Perez"
//                   fill
//                   priority
//                   className="object-cover rounded-full"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-violet-500/10" />
//               </div>
//               <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-violet-500 rounded-full blur-2xl opacity-20" />
//             </motion.div>

//             {/* Text Content Column */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.3 }}
//               className="text-center lg:text-left space-y-8 lg:flex-1"
//             >
//               {/* Name and Title */}
//               <div className="space-y-4">
//                 <h1 className="text-4xl md:text-6xl font-bold">
//                   Aaron A. Perez
//                 </h1>
//                 {/* <TypewriterEffectSmooth 
//                   className="text-center text-[40px] md:text-5xl lg:text-6xl"
//                 words="Hey there! I'm your friendly neighborhood code instructor."
//                 /> */}
//               </div>

              

//               {/* Description */}
//               <p className="text-lg max-w-2xl mx-auto lg:mx-0">
//                 Building modern web experiences with cutting-edge technology and a focus on
//                 creating intuitive user experiences and robust systems.
//               </p>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
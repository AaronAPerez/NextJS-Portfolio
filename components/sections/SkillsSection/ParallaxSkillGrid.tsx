// import { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";
// import { skills } from '@/config/skills';
// import SkillCard from './SkillCard';
// import { cn } from "@/lib/utils";

// export const ParallaxSkillGrid = () => {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   const parallaxRows = [
//     // Left moving row
//     {
//       initial: 0,
//       target: -100,
//       skills: skills.slice(0, Math.floor(skills.length / 3)),
//     },
//     // Right moving row
//     {
//       initial: -100,
//       target: 0,
//       skills: skills.slice(Math.floor(skills.length / 3), Math.floor(skills.length * 2 / 3)),
//     },
//     // Left moving row
//     {
//       initial: 0,
//       target: -100,
//       skills: skills.slice(Math.floor(skills.length * 2 / 3)),
//     },
//   ];

//   return (
//     <motion.div
//       ref={containerRef}
//       className="relative h-[300vh] bg-transparent"
//     >
//       <div className="sticky top-0 h-screen w-full overflow-hidden">
//         <motion.div className="absolute inset-0 w-full h-full bg-transparent z-0">
//           {/* Parallax Rows */}
//           {parallaxRows.map((row, rowIndex) => {
//             const translateX = useTransform(
//               scrollYProgress,
//               [0, 1],
//               [row.initial, row.target]
//             );

//             return (
//               <motion.div
//                 key={rowIndex}
//                 style={{ x: translateX }}
//                 className={cn(
//                   "absolute w-full flex gap-4",
//                   "py-[clamp(1rem,5vh,3rem)]",
//                 )}
//                 initial={{ y: rowIndex * 33 + "%"}}
//               >
//                 <div className="flex gap-4 animate-scroll">
//                   {/* First set of skills */}
//                   {row.skills.map((skill) => (
//                     <div
//                       key={skill.id}
//                       className="relative group"
//                     >
//                       <SkillCard
//                         skill={skill}
//                         isVisible={true}
//                       />
//                     </div>
//                   ))}
//                   {/* Duplicated set for infinite scroll effect */}
//                   {row.skills.map((skill) => (
//                     <div
//                       key={`${skill.id}-duplicate`}
//                       className="relative group"
//                     >
//                       <SkillCard
//                         skill={skill}
//                         isVisible={true}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             );
//           })}
//         </motion.div>

//         {/* Gradient Overlays */}
//         <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
//         <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
//       </div>
//     </motion.div>
//   );
// };

// export default ParallaxSkillGrid;
// 'use client';

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// import { SparklesCore } from '@/components/ui/sparkles-core';
// import { cn } from '@/lib/utils';
// import Image from 'next/image';
// import CardContainer, { CardBody, CardItem } from '../AboutSection/CardContainer';


// // Updated project data structure to match requirements
// const projects = [
//   {
//     title: "Expense Tracker",
//     description: "Full-stack expense tracking application with real-time updates",
//     longDescription: "A comprehensive financial management solution built during my time at CodeStack Academy. Features include real-time transaction tracking, intuitive data visualization tools, and robust budget planning capabilities.",
//     tech: ["TypeScript", "React", "Bootstrap", "C#", ".NET", "SQL Server"],
//     responsibilities: [
//       "Designed and implemented the full-stack architecture",
//       "Built real-time data synchronization system",
//       "Created interactive data visualization components",
//       "Implemented secure user authentication"
//     ],
//     features: [
//       "Real-time transaction tracking",
//       "Interactive data visualizations",
//       "Category-based organization",
//       "Budget planning tools"
//     ],
//     images: ["/images/projects/expense-tracker/expense-tracker-1.png"],
//     demoLink: "#",
//     codeLink: "https://github.com/yourusername/expense-tracker",
//     gradient: "from-[#c49a1c] to-[#ffd700]"
//   },
//   {
//     title: "West Valley Bowl",
//     description: "Modern business website redesign with online booking system",
//     longDescription: "Complete website redesign project featuring modern UI/UX design principles and a fully functional booking system. Created as part of CodeStack Academy's frontend development module.",
//     tech: ["Bootstrap", "HTML5", "CSS3", "JavaScript"],
//     responsibilities: [
//       "Led the complete website redesign",
//       "Implemented responsive layouts",
//       "Built online booking system",
//       "Optimized performance and SEO"
//     ],
//     features: [
//       "Online lane booking",
//       "Event scheduling",
//       "Real-time availability",
//       "Mobile-responsive design"
//     ],
//     images: ["/images/projects/bowling/bowling-1.png"],
//     demoLink: "#",
//     codeLink: "https://github.com/yourusername/bowling-site",
//     gradient: "from-[#358FEF] to-[#60a5fa]"
//   },
//   {
//     title: "Game WRLD",
//     description: "Video game database using RAWG.io API",
//     longDescription: "A feature-rich video game database leveraging the RAWG.io API for comprehensive game data. Built as part of CodeStack Academy's advanced frontend module.",
//     tech: ["React", "TypeScript", "Tailwind", "C#", ".NET"],
//     responsibilities: [
//       "Integrated RAWG.io API",
//       "Developed search and filtering system",
//       "Created responsive UI components",
//       "Implemented user favorites system"
//     ],
//     features: [
//       "Advanced search functionality",
//       "Game details and reviews",
//       "User favorites system",
//       "Genre-based filtering"
//     ],
//     images: ["/images/projects/game-wrld/game-wrld-1.png"],
//     demoLink: "#",
//     codeLink: "https://github.com/yourusername/game-wrld",
//     gradient: "from-[#4F46E5] to-[#06B6D4]"
//   }
// ];

// export const ProjectShowcase = () => {
//   const [] = useState(null);

//   return (
//     <section className="relative py-20 overflow-hidden">
//       <SparklesCore
//         id="projectSparkles"
//         className="absolute inset-0"
//         particleColor="rgba(37, 99, 235, 0.5)"
//       />
      
//       <div className="relative z-10 max-w-7xl mx-auto px-4">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500">
//             Featured Projects
//           </h2>
//           <p className="mt-4 text-gray-400">
//             Showcase of my technical skills and projects from CodeStack Academy
//           </p>
//         </motion.div>

//         {/* Projects Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {projects.map((project, index) => (
//             <motion.div
//               key={project.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.2 }}
//               className="w-full"
//             >
//               <CardContainer className="inter-var h-full">
//                 <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full rounded-xl p-6 border">
//                   {/* Project Image */}
//                   <CardItem
//                     translateZ={50}
//                     className="w-full aspect-video rounded-lg overflow-hidden"
//                   >
//                     <Image
//                       src={project.images[0]}
//                       alt={project.title}
//                       width={800}
//                       height={450}
//                       className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0" />
//                   </CardItem>

//                   {/* Project Info */}
//                   <div className="mt-6 space-y-4">
//                     <CardItem
//                       translateZ={60}
//                       className="text-2xl font-bold text-white"
//                     >
//                       {project.title}
//                     </CardItem>

//                     <CardItem
//                       translateZ={30}
//                       className="text-neutral-300 text-sm"
//                     >
//                       {project.description}
//                     </CardItem>

//                     {/* Technologies */}
//                     <CardItem
//                       translateZ={40}
//                       className="flex flex-wrap gap-2"
//                     >
//                       {project.tech.map((tech) => (
//                         <span
//                           key={tech}
//                           className="px-3 py-1 text-xs bg-white/20 rounded-full text-white"
//                         >
//                           {tech}
//                         </span>
//                       ))}
//                     </CardItem>

//                     {/* Key Features */}
//                     <CardItem
//                       translateZ={40}
//                       className="space-y-2"
//                     >
//                       <h4 className="text-sm font-semibold text-blue-400">Key Features:</h4>
//                       <ul className="grid grid-cols-2 gap-2">
//                         {project.features.map((feature, idx) => (
//                           <li key={idx} className="text-xs text-gray-300 flex items-center">
//                             <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
//                             {feature}
//                           </li>
//                         ))}
//                       </ul>
//                     </CardItem>

//                     {/* Action Buttons */}
//                     <CardItem translateZ={50} className="flex gap-4 pt-4">
//                       <a
//                         href={project.demoLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-violet-500 text-white text-sm font-medium text-center hover:opacity-90 transition-opacity"
//                       >
//                         Live Demo
//                       </a>
//                       <a
//                         href={project.codeLink}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex-1 px-4 py-2 rounded-lg border border-white/20 text-white text-sm font-medium text-center hover:bg-white/10 transition-colors"
//                       >
//                         View Code
//                       </a>
//                     </CardItem>
//                   </div>
//                 </CardBody>
//               </CardContainer>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProjectShowcase;
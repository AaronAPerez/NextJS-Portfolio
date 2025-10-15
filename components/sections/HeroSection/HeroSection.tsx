// 'use client'

// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import {
//   ArrowDown,
//   Download,
//   Github,
//   Linkedin,
//   Mail,
//   MapPin,
//   Calendar,
//   Star,
//   Trophy,
//   Code
// } from 'lucide-react'
// import Image from 'next/image'
// import { HeroHighlight } from '@/components/ui/hero-highlight'


// // Extend the Window interface to include gtag
// declare global {
//   interface Window {
//     gtag?: (...args: unknown[]) => void;
//   }
// }

// /**
//  * Enhanced Hero Section with Professional Styling
//  * Optimized for recruiter appeal with quantifiable metrics
//  */
// export default function HeroSection() {
//   const [mounted, setMounted] = useState(false)
//   const [, setCurrentMetric] = useState(0)

//   // Professional metrics that recruiters want to see
//   const heroMetrics = [
//     {
//       label: 'Projects Delivered',
//       value: '15+',
//       icon: Trophy,
//       color: 'text-gray-400 dark:text-gray-300',
//       description: 'Successfully completed',
//       bgColor: 'bg-gray-800/30 dark:bg-gray-900/30'
//     },
//     {
//       label: 'Client Satisfaction',
//       value: '100%',
//       icon: Star,
//       color: 'text-yellow-600 dark:text-yellow-400',
//       description: 'Positive feedback',
//       bgColor: 'bg-yellow-50 dark:bg-yellow-900/30'
//     },
//     {
//       label: 'Years Experience',
//       value: '3+',
//       icon: Calendar,
//       color: 'text-green-600 dark:text-green-400',
//       description: 'Professional development',
//       bgColor: 'bg-green-50 dark:bg-green-900/30'
//     },
//     {
//       label: 'Technologies',
//       value: '20+',
//       icon: Code,
//       color: 'text-indigo-600 dark:text-indigo-400',
//       description: 'Modern tech stack',
//       bgColor: 'bg-indigo-50 dark:bg-indigo-900/30'
//     }
//   ]

//   // Rotating technologies with enhanced styling
//   const technologies = [
//     { name: 'React', color: 'react-blue' },
//     { name: 'TypeScript', color: 'typescript-blue' },
//     { name: 'Next.js', color: 'text-gray-900 dark:text-white' },
//     { name: 'Node.js', color: 'node-green' },
//     { name: 'Azure', color: 'azure-blue' },
//     { name: 'C#', color: 'csharp-indigo' }
//   ]
//   const [currentTech, setCurrentTech] = useState(0)

//   useEffect(() => {
//     setMounted(true)

//     // Rotate metrics every 3.5 seconds
//     const metricInterval = setInterval(() => {
//       setCurrentMetric((prev) => (prev + 1) % heroMetrics.length)
//     }, 3500)

//     // Rotate technologies every 2.5 seconds
//     const techInterval = setInterval(() => {
//       setCurrentTech((prev) => (prev + 1) % technologies.length)
//     }, 2500)

//     return () => {
//       clearInterval(metricInterval)
//       clearInterval(techInterval)
//     }
//   }, [heroMetrics.length, technologies.length])

//   if (!mounted) return null

//   const scrollToProjects = () => {
//     document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
//   }

//   const handleResumeDownload = () => {
//     // Track download event for analytics
//     if (typeof window !== 'undefined' && window.gtag) {
//       window.gtag('event', 'resume_download', {
//         event_category: 'engagement',
//         event_label: 'hero_section'
//       })
//     }
//   }

//   const scrollToContact = () => {
//     document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
//   }

//   return (
//     <div className="relative w-full overflow-hidden min-h-screen">
//       {/* Background Effects - Raiders Silver & Black Theme */}
//       <div className="absolute inset-0 bg-gradient-to-b from-gray-500/5 via-transparent to-gray-800/5" />

//       {/* Additional Hero-specific gradient orbs */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-gray-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 dark:opacity-10 animate-blob"></div>
//         <div className="absolute top-40 right-20 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 dark:opacity-10 animate-blob animation-delay-2000"></div>
//         <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-gray-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 dark:opacity-10 animate-blob animation-delay-4000"></div>
//       </div>

//       <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8">
//         <div className="relative max-w-7xl mx-auto w-full">
//           <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

//             {/* Left Column - Enhanced Content */}
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, ease: 'easeOut' }}
//               className="space-y-6 md:space-y-8 w-full text-center lg:text-left"
//             >
//               {/* Enhanced Main Heading */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.2, duration: 0.6 }}
//               >
//                 <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">
//                   <span>
//                     Aaron A. Perez
//                   </span>
//                 </h1>
//               </motion.div>

//               <HeroHighlight>
//                 <motion.h2
//                   initial={{
//                     opacity: 0,
//                     y: 20,
//                   }}
//                   animate={{
//                     opacity: 1,
//                     y: [20, -5, 0],
//                   }}
//                   transition={{
//                     duration: 0.5,
//                     ease: [0.4, 0.0, 0.2, 1],
//                   }}
//                   className="text-2xl sm:text-3xl py-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed mx-auto lg:mx-0"
//                 >
//                   <Highlight className="text-black dark:text-white/90">
//                     Full Stack Developer
//                   </Highlight>
//                 </motion.h2>
//               </HeroHighlight>

//               <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300">
//                 <span>Specializing in</span>
//                 <AnimatePresence mode="wait">
//                   <motion.span
//                     key={technologies[currentTech].name}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -20 }}
//                     transition={{ duration: 0.3 }}
//                     className={`font-semibold ${technologies[currentTech].color}`}
//                   >
//                     {technologies[currentTech].name}
//                   </motion.span>
//                 </AnimatePresence>
//               </div>

//               {/* Enhanced CTA Buttons */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.8, duration: 0.6 }}
//                 className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
//               >
//                 <motion.button
//                   onClick={scrollToProjects}
//                   className="group touch-target px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   aria-label="View my portfolio projects"
//                 >
//                   <span>View My Work</span>
//                   <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
//                 </motion.button>

//                 <motion.a
//                   href="/A.Perez - Fullstack Resume.pdf"
//                   download
//                   onClick={handleResumeDownload}
//                   className="group touch-target px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px] hover:bg-white/20 dark:hover:bg-gray-800/50"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   aria-label="Download resume PDF"
//                 >
//                   <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
//                   <span>Download Resume</span>
//                 </motion.a>
//               </motion.div>

//               {/* Enhanced Social Links */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1, duration: 0.6 }}
//                 className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
//               >
//                 <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
//                   Connect with me:
//                 </span>
//                 <div className="flex flex-wrap gap-3">
//                   {[
//                     {
//                       icon: Github,
//                       href: 'https://github.com/AaronAPerez',
//                       label: 'GitHub',
//                       hoverColor: 'hover:text-gray-900 dark:hover:text-white',
//                       bgHover: 'hover:bg-gray-50 dark:hover:bg-gray-700'
//                     },
//                     {
//                       icon: Linkedin,
//                       href: 'https://linkedin.com/in/aaronaperezdev',
//                       label: 'LinkedIn',
//                       hoverColor: 'hover:text-gray-400',
//                       bgHover: 'hover:bg-gray-800/30 dark:hover:bg-gray-900/30'
//                     },
//                     {
//                       icon: Mail,
//                       href: 'mailto:aaperez06@gmail.com',
//                       label: 'Email',
//                       hoverColor: 'hover:text-red-500',
//                       bgHover: 'hover:bg-red-50 dark:hover:bg-red-900/30'
//                     }
//                   ].map((social) => {
//                     const IconComponent = social.icon
//                     return (
//                       <motion.a
//                         key={social.label}
//                         href={social.href}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         aria-label={social.label}
//                         className={`touch-target p-3 backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 rounded-full shadow-md transition-all duration-300 text-gray-600 dark:text-gray-400 min-h-[44px] min-w-[44px] flex items-center justify-center ${social.hoverColor} ${social.bgHover}`}
//                         whileHover={{ scale: 1.1, y: -2 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <IconComponent className="w-5 h-5" />
//                       </motion.a>
//                     )
//                   })}
//                 </div>
//               </motion.div>

//               {/* Professional Location */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 1.2, duration: 0.6 }}
//                 className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm text-gray-600 dark:text-gray-400"
//               >
//                 <MapPin className="w-4 h-4" />
//                 <span>Stockton, CA • Open to Remote Opportunities</span>
//               </motion.div>
//             </motion.div>

//             {/* Right Column - Enhanced Visual Element */}
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
//               className="flex justify-center lg:justify-end mt-12 lg:mt-0 pb-12 sm:pb-16"
//             >
//               <div className="relative mb-8 sm:mb-0">
//                 <motion.div
//                   animate={{ y: [0, -20, 0] }}
//                   transition={{
//                     duration: 6,
//                     repeat: Infinity,
//                     repeatType: 'reverse',
//                     ease: 'easeInOut'
//                   }}
//                   className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
//                 >
//                   {/* Enhanced Profile Image Container */}
//                   <div className="relative w-full h-full">
//                     <div className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full p-1 shadow-2xl">
//                       <div className="w-full h-full backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 rounded-full p-2">
//                         <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full overflow-hidden">
//                           <Image
//                             src="/images/profile/headshot.png"
//                             alt="Aaron A. Perez - Full Stack Developer"
//                             width={384}
//                             height={384}
//                             sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
//                             className="w-full h-full object-cover"
//                             priority
//                             quality={85}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Enhanced Floating Tech Icons */}
//                   <motion.div
//                     animate={{ rotate: 360 }}
//                     transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
//                     className="absolute -top-6 -right-6 backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
//                   >
//                     <Image
//                       src='/icons/frontend/react.svg'
//                       alt='React'
//                       width={32}
//                       height={32}
//                       className="react-blue"
//                       loading="lazy"
//                     />
//                   </motion.div>

//                   <motion.div
//                     animate={{ rotate: -360 }}
//                     transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
//                     className="absolute -bottom-6 -left-6 backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
//                   >
//                     <Image
//                       src='/icons/backend/nodejs.svg'
//                       alt='Node.js'
//                       width={28}
//                       height={28}
//                       className="node-green"
//                       loading="lazy"
//                     />
//                   </motion.div>

//                   <motion.div
//                     animate={{ rotate: 360, scale: [1, 1.1, 1] }}
//                     transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
//                     className="absolute top-1/4 -left-8 backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
//                   >
//                     <Image
//                       src='/icons/frontend/typescript.svg'
//                       alt='TypeScript'
//                       width={32}
//                       height={32}
//                       className="typescript-blue"
//                       loading="lazy"
//                     />
//                   </motion.div>

//                   <motion.div
//                     animate={{ y: [0, -15, 0] }}
//                     transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
//                     className="absolute top-1/3 -right-8 backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
//                   >
//                     <Image
//                       src='/icons/frontend/javascript.svg'
//                       alt='JavaScript'
//                       width={28}
//                       height={28}
//                       loading="lazy"
//                     />
//                   </motion.div>

//                   {/* Enhanced Glow Effect */}
//                   <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
//                 </motion.div>

//                 {/* Enhanced Achievement Badges */}
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 1.5, duration: 0.5 }}
//                   className="absolute -bottom-6 sm:-bottom-12 left-12 transform -translate-x-1/2 flex flex-col sm:flex-row gap-2 items-center z-10"
//                 >
//                   <div className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-full shadow-lg border border-green-200 dark:border-green-800 whitespace-nowrap">
//                     <div className="flex items-center gap-2">
//                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                       <span className="text-xs sm:text-sm font-semibold text-green-800 dark:text-green-300">
//                         Available for Hire
//                       </span>
//                     </div>
//                   </div>

//                   <motion.button
//                     onClick={scrollToContact}
//                     className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-full shadow-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-colors cursor-pointer whitespace-nowrap"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     aria-label="Scroll to contact section"
//                   >
//                     <span className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-300">
//                       Let&apos;s Connect
//                     </span>
//                   </motion.button>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Enhanced Scroll Indicator */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 2, duration: 0.6 }}
//             className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//           >
//             <motion.div
//               animate={{ y: [0, 10, 0] }}
//               transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
//               className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer"
//               onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
//             >
//               <span className="text-sm">Scroll to explore</span>
//               <div className="p-2 backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 rounded-full">
//                 <ArrowDown className="w-5 h-5" />
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   )
// }

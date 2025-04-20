// 'use client'

// import { motion } from 'framer-motion';
// import { cn } from "@/lib/utils";

// interface SectionLayoutProps {
//   id: string;
//   className?: string;
//   children: React.ReactNode;
//   title?: string;
//   subtitle?: string;
//   fullWidth?: boolean;
//   backgroundEffect?: 'gradient' | 'grid' | 'none';
// }

// export const SectionLayout = ({
//   id,
//   className,
//   children,
//   title,
//   subtitle,
//   fullWidth = false,
//   backgroundEffect = 'none'
// }: SectionLayoutProps) => {
//   const backgroundEffects = {
//     gradient: "bg-gradient-to-b from-gray-900/5 via-transparent to-gray-900/5",
//     grid: "bg-grid-small-white/[0.2] relative",
//     none: ""
//   };

//   return (
//     <section
//       id={id}
//       className={cn(
//         "min-h-screen py-20 relative scroll-mt-16",
//         !fullWidth && "px-4 sm:px-6 lg:px-8",
//         backgroundEffects[backgroundEffect],
//         className
//       )}
//     >
//       {/* Background blur effect for grid pattern */}
//       {backgroundEffect === 'grid' && (
//         <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
//       )}

//       {/* Content wrapper */}
//       <div className={cn(
//         "relative z-10",
//         !fullWidth && "max-w-7xl mx-auto"
//       )}>
//         {/* Section header */}
//         {(title || subtitle) && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             {title && (
//               <h2 className={cn(
//                 "text-3xl font-bold sm:text-4xl mb-4",
//                 "bg-clip-text text-transparent",
//                 "bg-gradient-to-r from-gray-900 to-gray-600",
//                 "dark:from-gray-100 dark:to-gray-400"
//               )}>
//                 {title}
//               </h2>
//             )}
//             {subtitle && (
//               <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//                 {subtitle}
//               </p>
//             )}
            
//             {/* Decorative underline */}
//             <div className="mt-4 flex justify-center">
//               <div className="h-1 w-20 bg-blue-500 rounded-full" />
//             </div>
//           </motion.div>
//         )}

//         {/* Main content */}
//         {children}
//       </div>
//     </section>
//   );
// };

// export default SectionLayout;
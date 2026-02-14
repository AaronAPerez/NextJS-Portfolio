// 'use client'

// import { cn } from "@/lib/utils";
// import { AnimatePresence, motion, useMotionValueEvent, useScroll, useReducedMotion } from "framer-motion";
// import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
// import { Menu, X } from "lucide-react";

// interface NavItem {
//   name: string;
//   link: string;
//   icon?: React.ReactNode;
// }

// interface FloatingNavbarProps {
//   navItems: NavItem[];
//   className?: string;
// }

// const FloatingNavbar = ({ navItems, className }: FloatingNavbarProps) => {
//   const { scrollYProgress } = useScroll();
//   const [visible, setVisible] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [activeSection, setActiveSection] = useState('');
//   const navRef = useRef<HTMLElement>(null);
//   const prefersReducedMotion = useReducedMotion();

//   // Memoize section IDs for observer
//   const sectionIds = useMemo(() =>
//     navItems.map(item => item.link.replace('#', '')),
//     [navItems]
//   );

//   // Consolidated event listeners effect
//   useEffect(() => {
//     // Click outside handler
//     const handleClickOutside = (event: MouseEvent) => {
//       if (navRef.current && !navRef.current.contains(event.target as Node)) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     // Resize handler with simple check (no debounce needed for boolean check)
//     const handleResize = () => {
//       if (window.innerWidth >= 768) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     // Only add listeners when mobile menu is open
//     if (isMobileMenuOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//       window.addEventListener('resize', handleResize);
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, [isMobileMenuOpen]);

//   // Handle keyboard navigation - memoized
//   const handleKeyPress = useCallback((
//     event: React.KeyboardEvent<HTMLAnchorElement>,
//     link: string
//   ) => {
//     if (event.key === 'Enter' || event.key === ' ') {
//       event.preventDefault();
//       document.querySelector(link)?.scrollIntoView({
//         behavior: prefersReducedMotion ? 'auto' : 'smooth'
//       });
//       setIsMobileMenuOpen(false);
//     }
//   }, [prefersReducedMotion]);

//   // Track scroll position for nav visibility
//   useMotionValueEvent(scrollYProgress, "change", (current) => {
//     if (typeof current === "number") {
//       const direction = current - (scrollYProgress.getPrevious() ?? 0);

//       // Show navbar when scrolling up or near the top
//       setVisible(scrollYProgress.get() >= 0.05 && direction < 0);

//       // Auto-hide mobile menu when scrolling down significantly
//       if (direction > 0.05 && isMobileMenuOpen) {
//         setIsMobileMenuOpen(false);
//       }
//     }
//   });

//   // Track active section with IntersectionObserver - optimized
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const visibleEntries = entries.filter(entry => entry.isIntersecting);

//         if (visibleEntries.length > 0) {
//           const mostVisible = visibleEntries.reduce((prev, current) =>
//             (prev.intersectionRatio > current.intersectionRatio) ? prev : current
//           );
//           setActiveSection(mostVisible.target.id);
//         }
//       },
//       {
//         threshold: [0.2, 0.5, 0.8],
//         rootMargin: '-10% 0px -10% 0px'
//       }
//     );

//     // Only observe sections that match our nav items
//     sectionIds.forEach(id => {
//       const section = document.getElementById(id);
//       if (section) observer.observe(section);
//     });

//     return () => observer.disconnect();
//   }, [sectionIds]);

//   // Handle navigation click - memoized
//   const handleNavClick = useCallback((link: string) => {
//     const element = document.querySelector(link);
//     if (element) {
//       const elementPosition = element.getBoundingClientRect().top;
//       const offsetPosition = elementPosition + window.pageYOffset - 100;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: prefersReducedMotion ? 'auto' : 'smooth'
//       });
//     }
//     setIsMobileMenuOpen(false);
//   }, [prefersReducedMotion]);

//   // Toggle mobile menu - memoized
//   const toggleMobileMenu = useCallback(() => {
//     setIsMobileMenuOpen(prev => !prev);
//   }, []);

//   return (
//     <motion.nav
//       ref={navRef}
//       role="navigation"
//       aria-label="Main navigation"
//       initial={{ opacity: 0, y: -100 }}
//       animate={{
//         y: visible ? 0 : -100,
//         opacity: visible ? 1 : 0,
//       }}
//       transition={{ 
//         duration: 0.3,
//         ease: [0.16, 1, 0.3, 1] // custom ease curve for smoother motion
//       }}
//       className={cn(
//         "fixed top-4 sm:top-6 inset-x-0 mx-auto z-50",
//         "w-[80%] sm:w-[90%] md:w-auto md:max-w-fit",
//         "backdrop-blur-xl shadow-2xl",
//         "px-3 py-1.5 sm:py-2",
//         "border-2",
//         "bg-gray-900/90",
//         "border-gray-800",
//         "rounded-full",
//         "transition-all duration-300",
//         className
//       )}
//     >
//       {/* Background Glow Effect */}
//       <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-xl opacity-30" />

//       {/* Desktop Navigation */}
//       <div className="relative hidden md:flex items-center justify-center">
//         <ul className="flex items-center gap-1">
//           {navItems.map((item) => {
//             const isActive = activeSection === item.link.replace('#', '');
            
//             return (
//               <li key={item.name} className="relative">
//                 <a
//                   href={item.link}
//                   className={cn(
//                     "relative px-4 py-2 rounded-full",
//                     "flex items-center gap-2",
//                     "text-sm font-semibold",
//                     "transition-all duration-300",
//                     isActive
//                       ? "text-white bg-gradient-to-r from-indigo-600 to-purple-600"
//                       : "text-gray-300 hover:text-white hover:bg-gray-800",
//                     "focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
//                   )}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     handleNavClick(item.link);
//                   }}
//                   onKeyDown={(e) => handleKeyPress(e, item.link)}
//                   role="menuitem"
//                   aria-current={isActive ? 'page' : undefined}
//                   tabIndex={0}
//                 >
//                   {isActive && (
//                     <motion.div
//                       layoutId="activeBackground"
//                       className="absolute inset-0 bg-white/10 rounded-full"
//                       transition={{ type: "spring", duration: 0.5 }}
//                     />
//                   )}
//                   <span className="relative flex items-center gap-2">
//                     {item.icon && (
//                       <span className={cn(
//                         "text-lg",
//                         isActive ? "text-blue-400" : "text-gray-400"
//                       )}>
//                         {item.icon}
//                       </span>
//                     )}
//                     <span>{item.name}</span>
//                   </span>
//                 </a>
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       {/* Mobile Navigation - App-like Bottom Menu */}
//       <div className="relative md:hidden flex items-center justify-between">
//         {/* Current Section Indicator */}
//         <div className="ml-2 text-white text-sm font-medium truncate flex-1">
//           {activeSection && navItems.find(item => item.link === `#${activeSection}`)?.name || 'Portfolio'}
//         </div>

//         {/* Menu Toggle Button - Touch-optimized (min 44x44px) */}
//         <button
//           onClick={toggleMobileMenu}
//           className={cn(
//             "p-3 text-white rounded-full transition-all duration-200 mr-2",
//             "min-w-[44px] min-h-[44px] flex items-center justify-center",
//             "active:scale-95 touch-manipulation",
//             isMobileMenuOpen ? "bg-white/20 shadow-lg" : "hover:bg-white/10 active:bg-white/15"
//           )}
//           aria-expanded={isMobileMenuOpen}
//           aria-controls="mobile-menu"
//           aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
//         >
//           <motion.div
//             initial={false}
//             animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
//             transition={{ duration: 0.3, ease: 'easeInOut' }}
//           >
//             {isMobileMenuOpen ? (
//               <X className="w-6 h-6" />
//             ) : (
//               <Menu className="w-6 h-6" />
//             )}
//           </motion.div>
//         </button>

//         {/* Mobile Menu - App-like Modal with Swipe Support */}
//         <AnimatePresence>
//           {isMobileMenuOpen && (
//             <>
//               {/* Backdrop */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//                 className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 aria-hidden="true"
//               />

//               {/* Menu Modal */}
//               <motion.div
//                 id="mobile-menu"
//                 initial={{ opacity: 0, y: -20, scale: 0.95 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 exit={{ opacity: 0, y: -20, scale: 0.95 }}
//                 transition={{
//                   type: 'spring',
//                   damping: 25,
//                   stiffness: 300,
//                   duration: 0.3
//                 }}
//                 drag="y"
//                 dragConstraints={{ top: 0, bottom: 100 }}
//                 dragElastic={0.2}
//                 onDragEnd={(_, info) => {
//                   if (info.offset.y > 50 || info.velocity.y > 500) {
//                     setIsMobileMenuOpen(false);
//                   }
//                 }}
//                 className={cn(
//                   "fixed left-4 right-4 top-20 z-50",
//                   "bg-gray-900/98 backdrop-blur-2xl",
//                   "rounded-3xl border border-white/10",
//                   "shadow-2xl overflow-hidden",
//                   "max-h-[calc(100vh-8rem)]"
//                 )}
//               >
//                 {/* Drag Handle */}
//                 <div className="flex justify-center py-2 border-b border-white/5">
//                   <div className="w-12 h-1.5 bg-white/20 rounded-full" />
//                 </div>

//                 <ul className="py-2 px-2 space-y-1 overflow-y-auto max-h-[calc(100vh-12rem)]">
//                   {navItems.map((item, index) => {
//                     const isActive = activeSection === item.link.replace('#', '');

//                     return (
//                       <motion.li
//                         key={item.name}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.05 }}
//                       >
//                         <a
//                           href={item.link}
//                           className={cn(
//                             "flex items-center gap-4 px-5 py-4 rounded-2xl",
//                             "text-base font-medium",
//                             "transition-all duration-200",
//                             "min-h-[56px] touch-manipulation",
//                             "active:scale-[0.98] active:opacity-80",
//                             isActive
//                               ? "bg-gradient-to-r from-blue-500/20 to-violet-500/20 text-white shadow-lg border border-blue-500/20"
//                               : "text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10"
//                           )}
//                           onClick={(e) => {
//                             e.preventDefault();
//                             handleNavClick(item.link);
//                           }}
//                           onKeyDown={(e) => handleKeyPress(e, item.link)}
//                           role="menuitem"
//                           aria-current={isActive ? 'page' : undefined}
//                         >
//                           {item.icon && (
//                             <span className={cn(
//                               "text-2xl flex-shrink-0",
//                               isActive ? "text-blue-400" : "text-gray-400"
//                             )}>
//                               {item.icon}
//                             </span>
//                           )}
//                           <span className="flex-1">{item.name}</span>
//                           {isActive && (
//                             <motion.div
//                               layoutId="activeMobileIndicator"
//                               className="w-2 h-2 bg-blue-400 rounded-full"
//                               transition={{ type: 'spring', duration: 0.5 }}
//                             />
//                           )}
//                         </a>
//                       </motion.li>
//                     );
//                   })}
//                 </ul>

//                 {/* Footer hint */}
//                 <div className="px-5 py-3 border-t border-white/5 bg-black/20">
//                   <p className="text-xs text-gray-400 text-center">
//                     Swipe down or tap outside to close
//                   </p>
//                 </div>
//               </motion.div>
//             </>
//           )}
//         </AnimatePresence>
//       </div>
//     </motion.nav>
//   );
// };

// export default FloatingNavbar;
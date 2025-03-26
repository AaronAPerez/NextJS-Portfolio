'use client'

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface FloatingNavbarProps {
  navItems: NavItem[];
  className?: string;
}

const FloatingNavbar = ({ navItems, className }: FloatingNavbarProps) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef<HTMLElement>(null);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on window resize to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen]);

  // Handle keyboard navigation
  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    link: string
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // Track scroll position for nav visibility
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;
      
      // Show navbar when scrolling up or near the top
      setVisible(scrollYProgress.get() >= 0.05 && direction < 0);
      
      // Auto-hide mobile menu when scrolling down significantly
      if (direction > 0.05 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
  });

  // Track active section with better threshold handling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Filter for elements that are more than 50% visible
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Get the one with the largest intersection ratio
          const mostVisible = visibleEntries.reduce((prev, current) => 
            (prev.intersectionRatio > current.intersectionRatio) ? prev : current
          );
          
          setActiveSection(mostVisible.target.id);
        }
      },
      { 
        threshold: [0.2, 0.5, 0.8],
        rootMargin: '-10% 0px -10% 0px' // Adjust the observation area
      }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Handle navigation click
  const handleNavClick = (link: string) => {
    const element = document.querySelector(link);
    if (element) {
      // Get element's position
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100; // Adjust offset as needed
      
      // Smooth scroll
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      ref={navRef}
      role="navigation"
      aria-label="Main navigation"
      initial={{ opacity: 0, y: -100 }}
      animate={{
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
      }}
      transition={{ 
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1] // custom ease curve for smoother motion
      }}
      className={cn(
        "fixed top-4 sm:top-6 inset-x-0 mx-auto z-50",
        "w-[80%] sm:w-[90%] md:w-auto md:max-w-fit", // Reduced width on mobile for ThemeSwitcher clearance
        "backdrop-blur-md shadow-xl",
        "px-3 py-1.5 sm:py-2",
        "border border-white/10",
        // Apply a stronger background on mobile for better contrast
        "bg-gray-900/70 md:bg-black/40 dark:bg-black/60 md:dark:bg-white/5",
        // Subtle gradient background
        "bg-gradient-to-r from-gray-900/70 via-gray-800/70 to-gray-900/70 md:from-black/40 md:to-black/40",
        "rounded-full",
        className
      )}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 blur-xl opacity-50" />

      {/* Desktop Navigation */}
      <div className="relative hidden md:flex items-center justify-center">
        <ul className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.link.replace('#', '');
            
            return (
              <li key={item.name} className="relative">
                <a
                  href={item.link}
                  className={cn(
                    "relative px-4 py-2 rounded-full",
                    "flex items-center gap-2",
                    "text-sm font-medium",
                    "transition-all duration-300",
                    isActive ? "text-white" : "text-gray-300 hover:text-white",
                    "hover:bg-white/10",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.link);
                  }}
                  onKeyDown={(e) => handleKeyPress(e, item.link)}
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                  tabIndex={0}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeBackground"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {item.icon && (
                      <span className={cn(
                        "text-lg",
                        isActive ? "text-blue-400" : "text-gray-400"
                      )}>
                        {item.icon}
                      </span>
                    )}
                    <span>{item.name}</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Mobile Navigation */}
      <div className="relative md:hidden flex items-center justify-between">
        {/* Current Section Indicator */}
        <div className="ml-2 text-white text-sm font-medium">
          {activeSection && navItems.find(item => item.link === `#${activeSection}`)?.name}
        </div>
        
        {/* Menu Toggle Button - moved to the left side to avoid ThemeSwitcher overlap */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "p-2 text-white rounded-full transition-colors mr-2", // Added right margin
            isMobileMenuOpen ? "bg-white/20" : "hover:bg-white/10"
          )}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">
            {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          </span>
          <motion.div
            initial={false}
            animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </motion.div>
        </button>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute left-0 right-0 mt-2 p-2",
                "top-full",
                "bg-gray-900/95 backdrop-blur-lg",
                "rounded-2xl border border-white/10",
                "shadow-xl"
              )}
            >
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = activeSection === item.link.replace('#', '');
                  
                  return (
                    <li key={item.name}>
                      <a
                        href={item.link}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl",
                          "text-sm font-medium",
                          "transition-all duration-200",
                          isActive 
                            ? "bg-white/10 text-white"
                            : "text-gray-300 hover:text-white hover:bg-white/5",
                          "active:scale-98"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.link);
                        }}
                        onKeyDown={(e) => handleKeyPress(e, item.link)}
                        role="menuitem"
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.icon && (
                          <span className={cn(
                            "text-lg",
                            isActive ? "text-blue-400" : "text-gray-400"
                          )}>
                            {item.icon}
                          </span>
                        )}
                        <span>{item.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default FloatingNavbar;
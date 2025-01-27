'use client'

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
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
      setVisible(scrollYProgress.get() >= 0.05 && direction < 0);
    }
  });

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Handle navigation click
  const handleNavClick = (link: string) => {
    document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        initial={{ opacity: 1, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed top-6 inset-x-0 mx-auto",
          "w-[95%] md:w-auto md:max-w-fit",
          "bg-black/40 dark:bg-white/5",
          "border border-white/10",
          "backdrop-blur-md",
          "rounded-full",
          "z-50 shadow-lg",
          "p-1.5",
          className
        )}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 blur-xl opacity-50" />

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="relative flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.link.replace('#', '');
              
              return (
                <li key={item.name}>
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
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-white rounded-full hover:bg-white/10"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">
              {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            </span>
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute left-0 right-0 mt-2 p-2 bg-black/90 backdrop-blur-lg rounded-2xl border border-white/10"
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
                            "transition-all duration-300",
                            isActive 
                              ? "bg-white/10 text-white"
                              : "text-gray-300 hover:text-white hover:bg-white/5",
                            "active:scale-95"
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
    </AnimatePresence>
  );
};

export default FloatingNavbar;
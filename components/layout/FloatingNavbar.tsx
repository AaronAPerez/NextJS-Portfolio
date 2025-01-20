'use client'

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";

import { useEffect, useState, JSX } from "react";

interface NavItem {
  name: string;
  link: string;
  icon?: JSX.Element;
}

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

    // Handle keyboard navigation
    const handleKeyPress = (
      event: React.KeyboardEvent<HTMLAnchorElement>,
      link: string
    ) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        document.querySelector(link)?.scrollIntoView({ behavior: 'smooth' });
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
          "fixed top-4 inset-x-0 mx-auto",
          "max-w-fit px-6 py-3",
          "backdrop-blur-md bg-white/10 dark:bg-black/10",
          "border border-white/10 rounded-full",
          "z-50 flex items-center justify-center gap-2",
          className
        )}
      >
       <ul className="flex justify-center gap-4">
              {navItems.map((item, index) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className={cn(
                      "px-4 py-2 rounded-full transition-colors",
                      activeSection === item.link.replace('#', '') && 
                      "text-blue-500"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(item.link)?.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }}
                    onKeyDown={(e) => handleKeyPress(e, item.link)}
                    role="menuitem"
                    aria-current={activeSection === item.link.replace('#', '') ? 
                      'page' : undefined}
                    tabIndex={0}
                  >
                    <span className="sr-only">{`Navigate to ${item.name} section`}</span>
                    <span className="flex items-center gap-2">
                      {item.icon}
                      <span>{item.name}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
      </motion.nav>
    </AnimatePresence>
  );
};
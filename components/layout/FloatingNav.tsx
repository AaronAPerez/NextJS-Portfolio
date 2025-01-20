'use client';

import { cn } from "@/lib/utils";
import React from "react";
import { useState } from "react";

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

const FloatingNav = ({ navItems }: { navItems: NavItem[] }) => {
  const [activeSection] = useState<string>('');

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

  return (
    <nav 
      role="navigation" 
      aria-label="Main navigation"
      className="fixed top-4 z-50 w-full"
    >
      <ul className="flex justify-center gap-4">
        {navItems.map((item) => (
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
    </nav>
  );
};

export default FloatingNav;
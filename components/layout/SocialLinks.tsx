'use client';

import { m } from 'framer-motion';
import { cn } from "@/lib/utils";
import { socialLinks } from '../config/social';

interface SocialLinksProps {
  className?: string;
  orientation?: 'vertical' | 'horizontal';
}

export const SocialLinks = ({ 
  className,
  orientation = 'vertical' 
}: SocialLinksProps) => {
  return (
    <m.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "flex",
        orientation === 'vertical' ? "flex-col" : "flex-row",
        "gap-4",
        className
      )}
    >
      {socialLinks.map((link, index) => {
        const Icon = link.icon;
        return (
          <m.a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              "bg-white/10 backdrop-blur-sm border border-white/20",
              "hover:bg-white/20 transition-colors"
            )}
            style={{ color: link.color }}
            aria-label={link.name}
          >
            <Icon className="w-5 h-5" />
          </m.a>
        );
      })}
    </m.div>
  );
};
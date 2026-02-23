import React from "react";
import Link from "next/link";

interface APHeaderProps {
  iconSrc?: string;   // the geometric blocks
  className?: string;
}

export const APHeader: React.FC<APHeaderProps> = ({
  iconSrc = "/favicon-48x48.svg", // export just the blocks as a separate file
  className = "",
}) => {
  return (
    <header className={`flex items-center ${className}`}>
      <Link href="https://www.aaronaperez.dev" className="flex items-center gap-4">
        
        {/* LEFT: Logo Blocks */}
        <img
          src={iconSrc}
          alt="AP Designs Logo Icon"
          className="h-12 w-auto"
        />

        {/* RIGHT: Text */}
        <div className="flex flex-col leading-tight">
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 transition-colors bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text bg-transparent">
          {/* <span className="text-2xl font-bold text-gradient-to-r from-sky-400 to-purple-500 bg-clip-text "> */}
            AP Designs
          </span>

          <span className="text-xs uppercase tracking-widest opacity-70 text-[var(--text-secondary,theme(colors.gray.500))]">
            Web Development
          </span>
        </div>

      </Link>
    </header>
  );
};
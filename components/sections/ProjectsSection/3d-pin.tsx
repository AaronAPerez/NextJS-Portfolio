"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const PinContainer = ({
  children,
  title,
  href,
  demoLink,
  codeLink,
  gradient,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  title?: string;
  href?: string;
  demoLink?: string;
  codeLink?: string;
  gradient?: { from: string; to: string };
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%,-50%) rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%,-50%) rotateX(40deg) scale(0.8)");
  };
  const onMouseLeave = () => {
    setTransform("translate(-50%,-50%) rotateX(0deg) scale(1)");
  };

  // Default gradient if none provided
  const defaultGradient = {
    from: "#3B82F6", // Blue
    to: "#8B5CF6"    // Purple
  };
  
  const titleGradient = gradient || defaultGradient;

  // Determine the main link - prefer demoLink if available
  const mainLink = demoLink || href || "/";
  const hasCodeLink = !!codeLink;
  const hasDemoLink = !!(demoLink || (href && !codeLink));

  return (
    <div
      className={cn(
        "relative group/pin z-50 cursor-pointer",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
      >
        <div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 p-4 top-1/2 flex justify-start items-start rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)] bg-black border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden"
        >
          <div className={cn("relative z-50", className)}>
            {/* Wrap the children with a Link if there's a main link */}
            {mainLink !== "/" ? (
              <Link href={mainLink} target="_blank" rel="noopener noreferrer">
                {children}
              </Link>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
      <PinPerspective 
        title={title} 
        demoLink={demoLink} 
        codeLink={codeLink} 
        hasCodeLink={hasCodeLink}
        hasDemoLink={hasDemoLink}
        gradient={titleGradient}
      />
    </div>
  );
};

export const PinPerspective = ({
  title,
  demoLink,
  codeLink,
  hasCodeLink,
  hasDemoLink,
  gradient
}: {
  title?: string;
  demoLink?: string;
  codeLink?: string;
  hasCodeLink?: boolean;
  hasDemoLink?: boolean;
  gradient?: { from: string; to: string };
}) => {
  // Default gradient if none provided
  const defaultGradient = {
    from: "#3B82F6", // Blue
    to: "#8B5CF6"    // Purple
  };
  
  const titleGradient = gradient || defaultGradient;
  
  return (
    <motion.div className="pointer-events-none h-[34rem] w-full flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
      <div className="w-full h-full -mt-7 flex inset-0">
        {/* Title Section */}
        <div className="absolute top-0 inset-x-0 flex flex-col items-center">
          <div className="mb-5 relative flex space-x-2 items-center z-10 rounded-xl bg-zinc-950 py-0.5 px-4 ring-1 ring-white/30">
            <span 
              className="relative z-20 text-lg font-bold inline-block py-0.5 bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(to right, ${titleGradient.from}, ${titleGradient.to})`
              }}
            >
              {title}
            </span>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </div>
          
          {/* Links Section - Appears under the title */}
          <div className="flex pointer-events-auto space-x-3">
            {hasCodeLink && (
              <a
                href={codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-1 text-sm font-semibold rounded-full bg-zinc-800 text-gray-200 border border-zinc-700 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white/20"
                onClick={(e) => e.stopPropagation()}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Code
              </a>
            )}
            {hasDemoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-1 text-sm  font-semibold rounded-full text-white
                shadow-black-100 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-white/20"
                style={{
                  background: `linear-gradient(to right, ${titleGradient.from}, ${titleGradient.to})`
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4 shadow-black-100" aria-hidden="true" />
                Live Demo
              </a>
            )}
          </div>
        </div>

        <div
          style={{
            perspective: "1000px",
            transform: "rotateX(70deg) translateZ(0)",
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 0,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 2,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                opacity: [0, 1, 0.5, 0],
                scale: 1,
                z: 0,
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: 4,
              }}
              className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
            ></motion.div>
          </>
        </div>

        <>
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40" />
          <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
          <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
        </>
      </div>
    </motion.div>
  );
};

export default PinContainer;
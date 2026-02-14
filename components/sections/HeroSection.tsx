'use client'

import { useState, useEffect, memo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ArrowDown,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from 'lucide-react'
import Image from 'next/image'
import { HeroHighlight, Highlight } from "../ui/hero-highlight";

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Memoized social link component for better performance
export const SocialLink = memo(({ social }: { social: { icon: typeof Github; href: string; label: string; hoverColor: string; bgHover: string } }) => {
  const IconComponent = social.icon
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className={`touch-target p-3 backdrop-blur-sm bg-gray-800/30 rounded-full shadow-md transition-all duration-300 text-gray-400 min-h-[44px] min-w-[44px] flex items-center justify-center ${social.hoverColor} ${social.bgHover}`}
      whileHover={prefersReducedMotion ? {} : { scale: 1.1, y: -2 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
    >
      <IconComponent className="w-5 h-5" />
    </motion.a>
  )
})
SocialLink.displayName = 'SocialLink'

// Static tech data outside component
const TECHNOLOGIES = [
  { name: 'React', color: 'react-blue' },
  { name: 'TypeScript', color: 'typescript-blue' },
  { name: 'Next.js', color: 'text-white' },
  { name: 'Node.js', color: 'node-green' },
  { name: 'Azure', color: 'azure-blue' },
  { name: 'C#', color: 'csharp-indigo' }
]

// Static social links data outside component
const SOCIAL_LINKS = [
  {
    icon: Github,
    href: 'https://github.com/AaronAPerez',
    label: 'GitHub',
    baseColor: 'text-[#181717] dark:text-white',
    hoverColor: 'hover:text-white dark:hover:text-[#181717]',
    baseBg: 'bg-white/80 dark:bg-gray-800/80',
    hoverBg: 'hover:bg-[#181717] dark:hover:bg-white'
  },
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/aaronaperezdev',
    label: 'LinkedIn',
    baseColor: 'text-[#0A66C2]',
    hoverColor: 'hover:text-white',
    baseBg: 'bg-white/80 dark:bg-gray-800/80',
    hoverBg: 'hover:bg-[#0A66C2]'
  },
  {
    icon: Mail,
    href: 'mailto:aaronperezdev@gmail.com',
    label: 'Email',
    baseColor: 'text-[#EA4335]',
    hoverColor: 'hover:text-white',
    baseBg: 'bg-white/80 dark:bg-gray-800/80',
    hoverBg: 'hover:bg-[#EA4335]'
  }
]

/**
 * Performance-optimized Hero Section
 * - Reduced animations for better FPS
 * - Memoized components
 * - Lazy-loaded images
 * - Respects prefers-reduced-motion
 */
export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  const [currentTech, setCurrentTech] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)

    // Only rotate technologies, removed unused metric rotation
    const techInterval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % TECHNOLOGIES.length)
    }, 2500)

    return () => {
      clearInterval(techInterval)
    }
  }, [])

  if (!mounted) return null

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleResumeDownload = () => {
    // Track download event for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'resume_download', {
        event_category: 'engagement',
        event_label: 'hero_section'
      })
    }
  }

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative w-full overflow-hidden min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>


      <div className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden py-8 sm:py-12 lg:py-2 px-4 sm:px-6 lg:px-8 pt-16 sm:pt-12 md:pt-14 lg:-mt-10">
        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">

            {/* Left Column - Streamlined Content */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: 'easeOut' }}
              className="space-y-4 sm:space-y-6 w-full text-center lg:text-left order-2 lg:order-1"
            >
              {/* Main headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white" id="hero-heading">
                Aaron A. Perez
              </h1>

              {/* Subtitle */}
              <HeroHighlight>
                <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-4xl leading-normal mx-auto lg:mx-0">
                  <Highlight className="text-white/90 dark:text-white/90 rounded-xl">
                    Full Stack Developer
                  </Highlight>
                </motion.h2>
              </HeroHighlight>


              {/* Tech stack rotation */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-base sm:text-lg text-gray-700 dark:text-gray-300 pt-2">
                <span>Building with</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={TECHNOLOGIES[currentTech].name}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
                    className="font-semibold text-primary-600 dark:text-primary-400"
                  >
                    {TECHNOLOGIES[currentTech].name}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
              >
                {SOCIAL_LINKS.map((social) => {
                  const IconComponent = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`touch-target p-3 backdrop-blur-sm rounded-full shadow-md transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center ${social.baseBg} ${social.baseColor} ${social.hoverColor} ${social.hoverBg}`}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  )
                })}
              </motion.div>



              {/* CTA Buttons */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.2, duration: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
              >
                <motion.button
                  onClick={scrollToProjects}
                  className="group touch-target px-8 py-3 text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  aria-label="View my portfolio projects"
                >
                  <span>View My Work</span>
                  <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </motion.button>

                <motion.a
                  href="/resume/Aaron-Perez-Resume.pdf"
                  download
                  onClick={handleResumeDownload}
                  className="group touch-target px-8 py-3 text-base backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px] hover:bg-white dark:hover:bg-gray-800"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  aria-label="Download resume PDF"
                >
                  <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Download Resume</span>
                </motion.a>
              </motion.div>
              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <MapPin className="w-4 h-4" />
                <span>Stockton, CA • Open to Remote</span>
              </motion.div>

            </motion.div>

            {/* Right Column - Enhanced Visual with Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="flex flex-col items-center lg:items-end gap-4 order-1 lg:order-2 pb-6 sm:pb-12"
            >
              {/* Profile Image Container */}
              <div className="relative w-full max-w-md flex justify-center">
                {/* Floating animation - CSS-based for better performance, respects reduced motion */}
                <div
                  className={`relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 ${
                    prefersReducedMotion ? '' : 'animate-float'
                  }`}
                  style={prefersReducedMotion ? {} : {
                    animation: 'float 6s ease-in-out infinite'
                  }}
                >
                  {/* Enhanced Profile Image Container */}
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-1 shadow-2xl">
                      <div className="w-full h-full backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 rounded-full p-2">
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full overflow-hidden">
                          <Image
                            src="/images/profile/headshot.webp"
                            alt="Aaron A. Perez - Full Stack Developer"
                            width={384}
                            height={384}
                            priority
                            fetchPriority="high"
                            sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Tech Icons - CSS animations for better performance */}
                  <div
                    className="absolute -top-6 -right-6 backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                    style={prefersReducedMotion ? {} : {
                      animation: 'spin 20s linear infinite'
                    }}
                  >
                    <Image
                      src='/icons/frontend/react.svg'
                      alt='React'
                      width={32}
                      height={32}
                      className="react-blue"
                    />
                  </div>

                  <div
                    className="absolute -bottom-2 -left-6 backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
                    style={prefersReducedMotion ? {} : {
                      animation: 'spin 25s linear infinite reverse'
                    }}
                  >
                    <Image
                      src='/icons/backend/nodejs.svg'
                      alt='Node.js'
                      width={28}
                      height={28}
                      className="node-green"
                    />
                  </div>

                  <div
                    className="absolute top-1/4 -left-8 backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={prefersReducedMotion ? {} : {
                      animation: 'pulse-scale 3s ease-in-out infinite'
                    }}
                  >
                    <Image
                      src='/icons/frontend/typescript.svg'
                      alt='TypeScript'
                      width={32}
                      height={32}
                      className="typescript-blue"
                    />
                  </div>

                  <div
                    className="absolute top-1/3 -right-8 backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                    style={prefersReducedMotion ? {} : {
                      animation: 'pulse-scale 4s ease-in-out infinite'
                    }}
                  >
                    <Image
                      src='/icons/frontend/javascript.svg'
                      alt='JavaScript'
                      width={28}
                      height={28}
                    />
                  </div>

                  {/* Glow Effect - static, no animation for better performance */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full blur-3xl opacity-15"></div>
                </div>

                {/* Achievement Badges */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="absolute -bottom-8 sm:-bottom-12 transform -translate-x-1/2 flex flex-col sm:flex-row gap-2 items-center z-10"
                >
                  <div className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-full shadow-lg border border-green-200 dark:border-green-800 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {/* Static green dot instead of animated pulse */}
                      <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_2px_rgba(34,197,94,0.6)]"></div>
                      <span className="text-xs sm:text-sm font-semibold text-green-800 dark:text-green-300">
                        Available for Hire
                      </span>
                    </div>
                  </div>

                  <motion.button
                    onClick={scrollToContact}
                    className="backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 px-4 py-2 rounded-full shadow-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer whitespace-nowrap"
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                    aria-label="Scroll to contact section"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-blue-800 dark:text-blue-300">
                      Let&apos;s Connect
                    </span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Scroll Indicator */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 cursor-pointer"
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-sm">Scroll to explore</span>
              <div className="p-2 backdrop-blur-sm bg-white/10 dark:bg-gray-800/30 rounded-full">
                <ArrowDown className="w-5 h-5" />
              </div>
            </motion.div>
          </motion.div> */}
        </div>
      </div>
    </div>
  )
}
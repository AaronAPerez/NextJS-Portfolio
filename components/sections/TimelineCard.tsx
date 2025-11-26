import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Award, Star, CheckCircle, ExternalLink, Building, Calendar, MapPin, ArrowRight, Zap } from "lucide-react"


// TypeScript interfaces for better type safety
interface TimelineItem {
  id: string
  title: string
  company?: string
  institution?: string
  period: string
  location: string
  type: 'work' | 'education' | 'certification' | 'degree'
  status: 'completed' | 'current'
  details: string[]
  skills: string[]
  gradient: string
  achievements?: string[]
  website?: string
}

interface TimelineCardProps extends TimelineItem {
  delay?: number
}

/**
 * Individual Timeline Card Component
 * Displays professional experience or education with enhanced accessibility and animations
 * 
 * @param props - Timeline card properties including title, company, period, etc.
 */
const TimelineCard = ({
  title,
  company,
  institution,
  period,
  location,
  details,
  skills,
  delay = 0,
  type,
  status,
  gradient,
  achievements = [],
  website
}: TimelineCardProps) => {
  // Get appropriate icon based on experience type
  const getIcon = () => {
    switch (type) {
      case 'work':
        return <Briefcase className="w-6 h-6" aria-hidden="true" />
      case 'education':
      case 'degree':
        return <GraduationCap className="w-6 h-6" aria-hidden="true" />
      case 'certification':
        return <Award className="w-6 h-6" aria-hidden="true" />
      default:
        return <Star className="w-6 h-6" aria-hidden="true" />
    }
  }

  // Get accessible status indicator with proper ARIA attributes
  const getStatusBadge = () => {
    if (status === 'current') {
      return (
        <div 
          className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-semibold rounded-full"
          role="status"
          aria-label="Currently employed"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
          Current
        </div>
      )
    }
    return (
      <div 
        className="flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded-full"
        role="status"
        aria-label="Previously completed"
      >
        <CheckCircle className="w-3 h-3" aria-hidden="true" />
        Completed
      </div>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative"
      role="article"
      aria-labelledby={`${type}-${title.replace(/\s+/g, '-').toLowerCase()}`}
      tabIndex={0}
    >
      {/* Main card with glassmorphism effect and enhanced hover states */}
      <div className="relative h-full bg-white/10 dark:bg-gray-900/50 backdrop-blur-lg border border-white/20 dark:border-gray-700/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
        
        {/* Gradient header with improved accessibility */}
        <div className={cn("p-6 bg-gradient-to-r", gradient, "relative overflow-hidden")}>
          {/* Background pattern for visual appeal */}
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute inset-0 bg-grid-white/20" />
          </div>
          
          {/* Header content with semantic structure */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  {getIcon()}
                </div>
                {getStatusBadge()}
              </div>
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-colors"
                  aria-label={`Visit ${company || institution} website`}
                >
                  <ExternalLink className="w-4 h-4 text-white" />
                </a>
              )}
            </div>

            <h3 
              id={`${type}-${title.replace(/\s+/g, '-').toLowerCase()}`}
              className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight"
            >
              {title}
            </h3>
            
            <div className="space-y-1 text-white/90">
              <div className="flex items-center gap-2 text-sm">
                <Building className="w-4 h-4" aria-hidden="true" />
                <span>{company || institution}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <time>{period}</time>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" aria-hidden="true" />
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full" aria-hidden="true" />
        </div>

        {/* Card content with improved structure */}
        <div className="p-6">
          {/* Details list with better accessibility */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
              Key Responsibilities & Achievements
            </h4>
            <ul className="space-y-3" role="list">
              {details.map((detail, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: delay + (idx * 0.1), duration: 0.4 }}
                  className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                  role="listitem"
                >
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                  <span className="leading-relaxed">{detail}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Achievements section (if available) */}
          {achievements.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4" aria-hidden="true" />
                Key Achievements
              </h4>
              <ul className="space-y-2" role="list">
                {achievements.map((achievement, idx) => (
                  <li 
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                    role="listitem"
                  >
                    <Star className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" aria-hidden="true" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills tags with improved accessibility */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Skills & Technologies
            </h4>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Skills and technologies used">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  role="listitem"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />
      </div>
    </motion.article>
  )
}

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle,
  Star,
  ArrowRight,
  Building,
  Award,
  ExternalLink,
  Zap
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { Card, CardHeader, CardContent } from '@/components/ui/Card'



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

  const getStatusBadge = () => {
    if (status === 'current') {
      return (
        <div
          className="flex items-center gap-2 px-3 py-1 bg-green-500/20 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full"
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
        className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full"
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
      className="group relative h-full"
      role="article"
      aria-labelledby={`${type}-${title.replace(/\s+/g, '-').toLowerCase()}`}
      tabIndex={0}
    >
      <Card variant="elevated" hoverable padding="none" className="h-full overflow-hidden">
        {/* Gradient header */}
        <CardHeader className={cn("p-6 bg-gradient-to-r", gradient, "relative overflow-hidden")}>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 dark:bg-white/10 rounded-lg backdrop-blur-sm">
                  {getIcon()}
                </div>
                {getStatusBadge()}
              </div>
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/20 dark:bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/30 dark:hover:bg-white/20 transition-colors"
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

          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" aria-hidden="true" />
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full" aria-hidden="true" />
        </CardHeader>

        {/* Card content */}
        <CardContent className="p-6">
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
                  <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                  <span className="leading-normal">{detail}</span>
                </motion.li>
              ))}
            </ul>
          </div>

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
                    <Star className="w-3 h-3 text-yellow-500 dark:text-yellow-400 mt-1 flex-shrink-0" aria-hidden="true" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
        </CardContent>
      </Card>
    </motion.article>
  )
}

export default TimelineCard;
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Copy,
  Download,
  Github,
  Linkedin,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import ContactForm from './ContactForm'

// Contact information
const contactInfo = {
  email: 'aaronperezdev@gmail.com',
  phone: '+1 (209) 470-2061',
  location: 'Stockton, CA',
  resume: '/A.Perez - Fullstack Resume.pdf'
}

// Quick actions data
const quickActions = [
  {
    id: 'email',
    label: 'Email',
    icon: Send,
    action: 'mailto',
    value: contactInfo.email,
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    id: 'copy',
    label: 'Copy',
    icon: Copy,
    action: 'copy',
    value: contactInfo.email,
    color: 'bg-purple-500 hover:bg-purple-600'
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: Download,
    action: 'download',
    value: contactInfo.resume,
    color: 'bg-green-500 hover:bg-green-600'
  }
]

// Social links
const socialLinks = [
  {
    id: 'github',
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/AaronAPerez',
    color: 'hover:bg-gray-800 hover:text-white'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/aaronaperezdev/',
    color: 'hover:bg-blue-600 hover:text-white'
  }
]

/**
 * Compact Quick Action Button
 */
const QuickActionButton = ({
  action,
  onCopy,
  copied
}: {
  action: typeof quickActions[0]
  onCopy: (value: string) => void
  copied: boolean
}) => {
  const IconComponent = action.icon
  const isCopyAction = action.action === 'copy'
  const showCopied = isCopyAction && copied

  const handleClick = () => {
    switch (action.action) {
      case 'mailto':
        window.open(`mailto:${action.value}`, '_blank')
        break
      case 'copy':
        onCopy(action.value)
        break
      case 'download':
        const link = document.createElement('a')
        link.href = action.value
        link.download = 'A.Perez_Resume.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        break
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300",
        showCopied ? "bg-green-500 text-white" : action.color,
        "text-white shadow-lg"
      )}
      aria-label={action.label}
    >
      {showCopied ? (
        <CheckCircle className="w-6 h-6" />
      ) : (
        <IconComponent className="w-6 h-6" />
      )}
      <span className="text-xs font-medium">
        {showCopied ? 'Copied!' : action.label}
      </span>
    </motion.button>
  )
}

/**
 * Compact Contact Info Sidebar
 */
const ContactSidebar = ({
  copied,
  onCopy
}: {
  copied: boolean
  onCopy: (value: string) => void
}) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="space-y-6"
  >
    {/* Contact Info Card */}
    <Card variant="elevated" padding="lg" className="backdrop-blur-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Contact Info
      </h3>

      <div className="space-y-3">
        <a
          href={`mailto:${contactInfo.email}`}
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
        >
          <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <span className="text-sm truncate">{contactInfo.email}</span>
        </a>

        <a
          href={`tel:${contactInfo.phone}`}
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors"
        >
          <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
          <span className="text-sm">{contactInfo.phone}</span>
        </a>

        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
          <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
          <span className="text-sm">{contactInfo.location}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Open to remote opportunities worldwide
        </p>
      </div>
    </Card>

    {/* Quick Actions */}
    <Card variant="elevated" padding="lg" className="backdrop-blur-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h3>

      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action) => (
          <QuickActionButton
            key={action.id}
            action={action}
            onCopy={onCopy}
            copied={copied}
          />
        ))}
      </div>
    </Card>

    {/* Social Links */}
    <Card variant="elevated" padding="lg" className="backdrop-blur-sm">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Connect
      </h3>

      <div className="flex gap-3">
        {socialLinks.map((link) => {
          const IconComponent = link.icon
          return (
            <motion.a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg",
                "bg-gray-100 dark:bg-gray-800",
                "text-gray-700 dark:text-gray-300",
                "transition-all duration-300",
                link.color
              )}
              aria-label={`Visit my ${link.name} profile`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="text-sm font-medium">{link.name}</span>
              <ExternalLink className="w-3 h-3 opacity-50" />
            </motion.a>
          )
        })}
      </div>
    </Card>
  </motion.div>
)

/**
 * Main Contact Section Component - Redesigned with form-first layout
 */
export const ContactSection = () => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy email:', error)
    }
  }

  return (
    <div className="relative w-full overflow-hidden py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-violet-500/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Decorative line with icon */}
          <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-blue-500" />
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-purple-500" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Let&apos;s Connect
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Send me a message and I&apos;ll get back to you within 24-48 hours.
          </p>
        </motion.header>

        {/* Copy success notification */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-600 dark:text-green-400 rounded-full border border-green-500/30">
                <CheckCircle className="w-4 h-4" />
                Email copied to clipboard!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Grid: Form + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form - Primary focus */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card variant="elevated" padding="lg" className="backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Send a Message
                </h3>
              </div>
              <ContactForm />
            </Card>
          </motion.div>

          {/* Sidebar - Contact info, quick actions, social */}
          <ContactSidebar copied={copied} onCopy={handleCopy} />
        </div>
      </div>
    </div>
  )
}

export default ContactSection

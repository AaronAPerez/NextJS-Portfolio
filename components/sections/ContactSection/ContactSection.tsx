'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
  ExternalLink,
  ArrowRight,
  Star
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Card } from '@/components/ui/Card'
import ContactForm from './ContactForm'



// Contact information and social links data
const contactInfo = {
  email: 'aaronperezdev@gmail.com',
  phone: '+1 (209) 470-2061',
  location: 'Stockton, CA',
  resume: '/A.Perez - Fullstack Resume.pdf'
}

const socialLinks = [
  {
    id: 'github',
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/AaronAPerez',
    description: 'View my code repositories and open source contributions',
    color: 'from-gray-700 to-gray-900',
    hoverColor: 'hover:from-gray-600 hover:to-gray-800'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/aaronaperezdev/',
    description: 'Connect with me professionally',
    color: 'from-blue-600 to-blue-800',
    hoverColor: 'hover:from-blue-500 hover:to-blue-700'
  }
]

// Quick contact actions data
const contactActions = [
  {
    id: 'email',
    title: 'Send Email',
    description: 'Reach out directly via email',
    icon: Send,
    action: 'mailto',
    value: contactInfo.email,
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'copy',
    title: 'Copy Email',
    description: 'Copy email to clipboard',
    icon: Copy,
    action: 'copy',
    value: contactInfo.email,
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'resume',
    title: 'Download Resume',
    description: 'Get my latest resume',
    icon: Download,
    action: 'download',
    value: contactInfo.resume,
    gradient: 'from-green-500 to-emerald-500'
  }
]

/**
 * Contact Action Card Component
 */
const ContactActionCard = ({
  action,
  index,
  onCopy
}: {
  action: typeof contactActions[0]
  index: number
  onCopy: (value: string) => void
}) => {
  const [isPressed, setIsPressed] = useState(false)
  const IconComponent = action.icon

  const handleClick = () => {
    switch (action.action) {
      case 'mailto':
        window.open(`mailto:${action.value}`, '_blank')
        break
      case 'copy':
        onCopy(action.value)
        break
      case 'download':
        try {
          const link = document.createElement('a')
          link.href = action.value
          link.download = 'A.Perez_Resume.pdf'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } catch (error) {
          console.error('Failed to download resume:', error)
        }
        break
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative w-full"
    >
      <Card
        variant="elevated"
        hoverable
        padding="lg"
        onClick={handleClick}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className="cursor-pointer overflow-hidden"
        role="button"
        aria-label={action.description}
      >
        {/* Gradient background */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500",
          `bg-gradient-to-br ${action.gradient}`
        )} />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3">
            <div className={cn(
              "p-3 rounded-xl transition-all duration-300",
              `bg-gradient-to-br ${action.gradient}`,
              isPressed ? "scale-95" : "group-hover:scale-110"
            )}>
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <h4 className="font-semibold text-gray-900 dark:text-white transition-colors">
                {action.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                {action.description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors font-mono">
              {action.action === 'copy' ? 'Click to copy' :
                action.action === 'mailto' ? 'Opens email client' :
                  'Downloads PDF file'}
            </span>
            <ArrowRight className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

/**
 * Social Link Card Component
 */
const SocialLinkCard = ({
  link,
  index
}: {
  link: typeof socialLinks[0]
  index: number
}) => {
  const IconComponent = link.icon

  return (

    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative"
    >
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit my ${link.name} profile`}
      >
        <Card variant="elevated" hoverable padding="lg" className="text-center overflow-hidden">
          {/* Gradient background on hover */}
          <div className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500",
            `bg-gradient-to-br ${link.color}`
          )} />

          {/* Content */}
          <div className="relative z-10">
            <div className="mb-4">
              <div className={cn(
                "inline-flex p-4 rounded-2xl transition-all duration-300 group-hover:scale-110",
                `bg-gradient-to-br ${link.color}`
              )}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
            </div>

            <h3 className="font-bold text-lg text-gray-900 dark:text-white transition-colors mb-2">
              {link.name}
            </h3>

            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors leading-normal">
              {link.description}
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 transition-colors">
              <ExternalLink className="w-3 h-3" />
              Visit Profile
            </div>
          </div>
        </Card>
      </a>
    </motion.div>
  )
}

/**
 * Contact Information Card Component
 */
const ContactInfoCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative p-8 backdrop-blur-lg dark:bg-gray-800 border border-black/10 rounded-2xl overflow-hidden hover:border-slate-500/50 transition-all duration-500"
  >

    {/* Gradient background */}
    <div className="absolute inset-0" />

    {/* Content */}
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="px-2 pt-1 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
          <Image
            src="/images/profile/headshot.png"
            alt="Aaron A. Perez - Full Stack Developer"
            width={60}
            height={60} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Contact Information
        </h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
          <Mail className="w-5 h-5 text-blue-500" />
          <span className="font-mono text-sm">{contactInfo.email}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
          <Phone className="w-5 h-5 text-green-500" />
          <span className="font-mono text-sm">{contactInfo.phone}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
          <MapPin className="w-5 h-5 text-red-500" />
          <span className="text-sm">{contactInfo.location}</span>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-normal">
          I&apos;m always open to discussing new opportunities, interesting projects,
          or just having a conversation about technology and development.
        </p>
      </div>
    </div>
  </motion.div>
)

/**
 * Main Contact Section Component
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

      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-violet-500/5" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px]" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header matching TimelineSection style */}
        <motion.header
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Decorative line with icon */}
          <div className="flex items-center justify-center gap-4 mb-6" aria-hidden="true">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500" />
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your next project to life? I'd love to hear about your ideas
          </p>
        </motion.header>

        {/* Success message for copy action */}
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/30 text-green-300 rounded-full">
              <CheckCircle className="w-4 h-4" />
              Email copied to clipboard!
            </div>
          </motion.div>
        )}

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Actions */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-500" />
                Quick Actions
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose the best way to get in touch
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {contactActions.map((action, index) => (
                <ContactActionCard
                  key={action.id}
                  action={action}
                  index={index}
                  onCopy={handleCopy}
                />
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className='lg:mt-24 text-gray-900 dark:text-white'>
            <ContactInfoCard />
          </div>
        </div>

        {/* Contact Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
              <Send className="w-6 h-6 text-blue-500" />
              Send Me a Message
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Fill out the form below and I'll get back to you within 24-48 hours
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card variant="elevated" padding="lg" className="backdrop-blur-sm">
              <ContactForm />
            </Card>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Connect on Social
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Follow my work and connect professionally
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {socialLinks.map((link, index) => (
              <SocialLinkCard
                key={link.id}
                link={link}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ContactSection

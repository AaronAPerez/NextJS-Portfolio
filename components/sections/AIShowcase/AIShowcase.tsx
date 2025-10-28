'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import SectionTitle from '@/components/SectionTitle';
import { FiCpu, FiMessageCircle, FiZap, FiCode, FiDatabase } from 'react-icons/fi';

const features = [
  {
    icon: FiMessageCircle,
    title: "Intelligent Chat Interface",
    description: "Natural language processing to answer questions about skills, projects, and experience",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: FiDatabase,
    title: "Knowledge Base Integration",
    description: "Structured portfolio data with smart query understanding and context-aware responses",
    color: "from-violet-500 to-purple-500"
  },
  {
    icon: FiZap,
    title: "Real-time Responses",
    description: "Fast, optimized API routes with edge deployment for instant user interactions",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: FiCode,
    title: "Modern Tech Stack",
    description: "Built with Next.js 15, TypeScript, and React 19 showcasing latest development patterns",
    color: "from-green-500 to-emerald-500"
  },
];

const techStack = [
  { name: "Next.js 15", icon: FiCode, description: "App Router & API Routes" },
  { name: "TypeScript", icon: FiCode, description: "Type-safe Development" },
  { name: "React 19", icon: FiCode, description: "Modern Hooks & Patterns" },
  { name: "Framer Motion", icon: FiZap, description: "Smooth Animations" },
  { name: "Tailwind CSS", icon: FiCode, description: "Utility-first Styling" },
  { name: "AI Integration", icon: FiCpu, description: "Smart Responses" },
];

export const AIShowcase = () => {
  return (
    <div className="relative w-full overflow-hidden py-20">
      <div className="relative z-10 container mx-auto px-4">
        <SectionTitle
          title="AI-Powered Assistant"
          subtitle="Showcasing modern AI integration and full-stack development skills"
        />

        {/* Main Feature Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className={cn(
            "relative rounded-2xl p-8 md:p-12",
            "bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90",
            "backdrop-blur-sm border border-white/10",
            "hover:border-white/20 transition-all duration-500",
            "group overflow-hidden"
          )}>
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-violet-500/10 to-purple-500/10 animate-gradient-xy" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                  <FiCpu className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Interactive AI Assistant</h3>
                  <p className="text-gray-400">Click the chat button in the bottom-right corner to try it!</p>
                </div>
              </div>

              <p className="text-gray-300 text-lg mb-6 leading-normal">
                This portfolio features a custom-built AI assistant that can intelligently answer questions about my skills,
                projects, and experience. It demonstrates proficiency in modern web development, API design, and creating
                practical AI-powered features.
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
                  Full Stack Development
                </span>
                <span className="px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium">
                  AI Integration
                </span>
                <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-sm font-medium">
                  Modern UI/UX
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className={cn(
                "relative rounded-xl p-6",
                "bg-white/5 backdrop-blur-sm",
                "border border-white/10 hover:border-white/20",
                "transition-all duration-300",
                "group hover:shadow-lg"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-lg mb-4",
                "bg-gradient-to-br rounded-xl", feature.color,
                "flex items-center justify-center",
                "group-hover:scale-110 transition-transform duration-300"
              )}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold text-lg mb-2">{feature.title}</h4>
              <p className="text-gray-400 text-sm leading-normal">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">Technologies Used</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * index }}
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "relative rounded-lg p-4",
                  "bg-white/5 backdrop-blur-sm",
                  "border border-white/10 hover:border-blue-500/50",
                  "transition-all duration-300",
                  "cursor-default"
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <tech.icon className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold text-sm">{tech.name}</span>
                </div>
                <p className="text-gray-400 text-xs">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 text-lg mb-4">
            👉 Try asking the AI assistant questions like:
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {[
              "What are Aaron's technical skills?",
              "Tell me about his projects",
              "What's his experience with AWS?",
            ].map((question, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-white/10 text-gray-300 text-sm"
              >
                &ldquo;{question}&rdquo;
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIShowcase;

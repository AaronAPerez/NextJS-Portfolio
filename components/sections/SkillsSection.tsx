'use client'

import Image from 'next/image'
import { Code2 } from 'lucide-react'
import { SectionHeader } from '@/components/sections/shared'
import { skills } from '@/data/skills'

// Primary stack skill IDs - these get highlighted styling
const CORE_SKILL_IDS = [
  'react',
  'nextjs',
  'typescript',
  'tailwind',
  'nodejs',
  'csharp',
  'dotnet',
  'azure',
]

function SkillsSection() {
  // Separate core skills from secondary skills
  const coreSkills = skills.filter((skill) => CORE_SKILL_IDS.includes(skill.id))
  const secondarySkills = skills.filter((skill) => !CORE_SKILL_IDS.includes(skill.id))

  return (
    <div className="bg-gray-50 py-20 dark:bg-gray-900/50 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header — shared treatment with About/Projects/Contact */}
        <SectionHeader
          icon={Code2}
          titleId="skills-heading"
          title="Technical Toolkit"
          description="Highlighted entries are the primary stack behind every production project; the rest are tools I reach for as a project needs them."
          className="mb-12"
        />

        {/* Skills grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {/* Core skills — highlighted with blue styling */}
          {coreSkills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-center gap-2 px-2 py-6 text-center text-sm font-medium text-blue-700 transition-transform hover:scale-105   dark:text-blue-300
              backdrop-blur-lg"
              title={skill.description}
            >
              <Image
                src={skill.icon}
                alt={`${skill.name} icon`}
                width={20}
                height={20}
                className="h-10 w-10 flex-shrink-0"
              />
              <span>{skill.name}</span>
            </div>
          ))}

          {/* Secondary skills — neutral styling */}
          {secondarySkills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-center gap-2 px-2 py-6 text-center text-sm text-gray-600 transition-transform hover:scale-105 dark:text-gray-300
              backdrop-blur-lg"
              title={skill.description}
            >
              <Image
                src={skill.icon}
                alt={`${skill.name} icon`}
                width={20}
                height={20}
                className="h-10 w-10 flex-shrink-0"
              />
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SkillsSection
'use client'

import Image from 'next/image'
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
    <section id="skills" className="bg-gray-50 py-20 dark:bg-gray-900/50 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-10 flex flex-col text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            Skills
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Technical toolkit
          </h2>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            Highlighted = primary stack I use on every production project.
          </p>
        </div>

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
    </section>
  )
}

export default SkillsSection
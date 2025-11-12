'use client';

import { motion } from 'framer-motion';

import { ArrowRight, ExternalLink, Github } from 'lucide-react';

const projectDetails = [
  {
    id: 'amp-vending',
    slug: 'amp-vending',
    title: "AMP Vending Machines",
    tagline: "Professional Business Website",
    type: "Production Client Project",
    description: "Complete digital presence for a local vending machine business",
    
    problem: "A friend starting AMP Vending needed a professional website to compete with established companies and attract B2B clients in Central California.",
    
    whatIBuilt: [
      "Fully responsive Next.js website with TypeScript",
      "Product catalog with detailed specifications",
      "Contact forms with email integration",
      "Google Maps integration for service areas",
      "SEO optimization with meta tags and structured data",
      "Fast loading times (under 1 second)",
      "Mobile-first design that works on all devices",
      "WCAG accessibility compliance"
    ],
    
    challenges: [
      "First real production website - had to ensure professional quality",
      "Client needed quick turnaround (completed in 3 weeks)",
      "Had to learn deployment and domain configuration",
      "Implemented email forms without a backend initially"
    ],
    
    solutions: [
      "Used Next.js for optimal performance and SEO",
      "Implemented modern design with Tailwind CSS",
      "Set up Vercel deployment with custom domain",
      "Created reusable components for easy updates",
      "Used Zod for form validation",
      "Integrated email service for contact forms"
    ],
    
    results: [
      { label: "Load Time", value: "< 1s", context: "Fast user experience" },
      { label: "Lighthouse Score", value: "98/100", context: "Performance optimized" },
      { label: "Mobile Responsive", value: "100%", context: "Works on all devices" },
      { label: "Business Impact", value: "Live & Active", context: "Successfully deployed" }
    ],
    
    tech: ["Next.js 14", "React 18", "TypeScript", "Tailwind CSS", "Vercel", "Google Maps API"],
    
    myRole: "Solo Developer - Design, Development, Deployment",
    timeline: "3 weeks",
    status: "Live in Production",
    
    images: ["/images/projects/amp-vending/amp-vending-1.png"],
    demoLink: "https://www.ampvendingmachines.com",
    codeLink: "https://github.com/AaronAPerez/AMP-Vending_Website",
    
    keyLearnings: [
      "Learned to manage client expectations and timelines",
      "Gained experience with production deployments",
      "Understood importance of SEO for business websites",
      "Developed skills in responsive design implementation"
    ]
  },
  
  {
    id: 'cloudgov-dashboard',
    slug: 'cloudgov-dashboard',
    title: "CloudGov Dashboard",
    tagline: "Enterprise Cloud Management Platform",
    type: "Portfolio/Job Application Project",
    description: "Full-stack AWS resource management dashboard built to demonstrate qualifications for Software Developer position at Lawrence Livermore National Laboratory",
    
    problem: "Needed to demonstrate enterprise-level development skills including AWS integration, real-time data handling, security best practices, and production-ready code quality.",
    
    whatIBuilt: [
      "Full-stack Next.js dashboard with TypeScript",
      "Real-time AWS resource monitoring simulation",
      "Cost optimization recommendations engine",
      "Security compliance tracking system",
      "Interactive data visualizations with Recharts",
      "Comprehensive testing suite (Jest + Playwright)",
      "Docker containerization",
      "CI/CD pipeline setup",
      "Complete documentation"
    ],
    
    challenges: [
      "Simulating enterprise AWS features without real AWS access",
      "Implementing complex data visualization",
      "Writing production-quality tests",
      "Demonstrating security best practices",
      "Creating realistic demo data"
    ],
    
    solutions: [
      "Built realistic mock data generators",
      "Implemented data caching with SWR",
      "Created modular, testable components",
      "Used TypeScript for type safety",
      "Documented architecture decisions",
      "Set up professional git workflow"
    ],
    
    results: [
      { label: "Test Coverage", value: "85%", context: "Comprehensive testing" },
      { label: "Type Safety", value: "100%", context: "Full TypeScript" },
      { label: "Code Quality", value: "A Grade", context: "Professional standards" },
      { label: "Documentation", value: "Complete", context: "README + inline docs" }
    ],
    
    tech: [
      "Next.js 14", "React 18", "TypeScript", "Tailwind CSS",
      "SWR", "Recharts", "Jest", "Playwright", "Docker", "Zod"
    ],
    
    myRole: "Solo Developer - Architecture to Deployment",
    timeline: "4 weeks (part-time)",
    status: "Portfolio Showcase",
    
    images: ["/images/projects/cloudgov-dashboard/cloudgov-1.png"],
    demoLink: "https://cloudgov-dashboard.vercel.app",
    codeLink: "https://github.com/YOUR_USERNAME/cloudgov-dashboard",
    
    keyLearnings: [
      "How to structure enterprise-scale applications",
      "Importance of comprehensive testing",
      "Writing production-ready documentation",
      "Implementing complex state management",
      "Creating professional developer experience"
    ]
  },
  
  // Add similar detailed objects for Goldmine and Glamping Spot
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Project Case Studies
          </h1>
          <p className="text-gray-400 text-lg">
            Real projects built for real businesses and technical challenges
          </p>
        </motion.div>

        <div className="space-y-12">
          {projectDetails.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all"
            >
              {/* Project Header */}
              <div className="p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {project.type}
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    {project.status}
                  </span>
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-xl text-gray-400 mb-6">{project.tagline}</p>

                <div className="flex flex-wrap gap-4 mb-8">
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Site
                  </a>
                  <a  
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                </div>

                {/* Two Column Layout */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-xl font-bold text-white mb-3">The Problem</h3>
                      <p className="text-gray-300 leading-relaxed">{project.problem}</p>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-white mb-3">What I Built</h3>
                      <ul className="space-y-2">
                        {project.whatIBuilt.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300">
                            <ArrowRight className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-white mb-3">Key Learnings</h3>
                      <ul className="space-y-2">
                        {project.keyLearnings.map((learning, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300">
                            <span className="text-yellow-400">💡</span>
                            <span>{learning}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <section className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4">Results & Metrics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {project.results.map((result, i) => (
                          <div key={i}>
                            <div className="text-2xl font-bold text-blue-400">{result.value}</div>
                            <div className="text-sm font-semibold text-white">{result.label}</div>
                            <div className="text-xs text-gray-400">{result.context}</div>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded-full border border-gray-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </section>

                    <section className="bg-white/5 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Role:</span>
                        <span className="text-white font-semibold">{project.myRole}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Timeline:</span>
                        <span className="text-white font-semibold">{project.timeline}</span>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
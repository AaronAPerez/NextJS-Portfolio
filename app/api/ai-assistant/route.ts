/**
 * AI Assistant API Route
 *
 * Handles chat messages and generates contextual responses about Aaron's
 * portfolio, skills, projects, and experience using a rule-based knowledge
 * base system. Provides quick, relevant answers without external API calls.
 */

import { NextRequest, NextResponse } from 'next/server';

// Portfolio knowledge base - centralized data for consistent responses
const portfolioData = {
  name: "Aaron A. Perez",
  role: "Full Stack Developer",
  location: "California",

  education: {
    degrees: [
      {
        type: "Bachelor of Science",
        field: "Information Systems and Cyber Security",
        institution: "ITT Technical Institute",
        gpa: "3.5"
      },
      {
        type: "Associate of Applied Science",
        field: "Network Systems Administration",
        institution: "ITT Technical Institute"
      }
    ],
    currentTraining: {
      program: "Full Stack Web Development Bootcamp",
      institution: "CodeStack Academy",
      focus: "Modern web development with React, Next.js, Node.js, and cloud technologies"
    }
  },

  skills: {
    frontend: [
      "React", "Next.js", "TypeScript", "JavaScript (ES6+)",
      "HTML5", "CSS3", "Tailwind CSS", "Framer Motion",
      "Responsive Design", "Accessibility (WCAG)"
    ],
    backend: [
      "Node.js", "Express.js", "NestJS", "RESTful APIs",
      "Python", "C#", ".NET"
    ],
    database: [
      "PostgreSQL", "MySQL", "MongoDB", "Prisma ORM",
      "SQL Server", "DynamoDB"
    ],
    cloud: [
      "AWS (S3, Lambda, EC2, DynamoDB, CloudFront)",
      "Vercel", "Docker", "Azure", "Google Cloud"
    ],
    tools: [
      "Git", "GitHub", "VS Code", "Postman", "Swagger",
      "Figma", "Jest", "CI/CD Pipelines"
    ],
    itBackground: [
      "Network Administration", "System Administration",
      "Technical Support", "Cyber Security",
      "Troubleshooting", "Documentation"
    ]
  },

  projects: [
    {
      name: "AMP Vending Digital Transformation",
      description: "Built the first professional web presence for a local vending business, enabling online lead generation and establishing credibility with enterprise clients",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
      impact: "Enabled lead generation and professional online presence",
      type: "Business Website"
    },
    {
      name: "Portfolio Website",
      description: "Modern, accessible portfolio showcasing projects with 100 Lighthouse scores, featuring AI assistant, admin dashboard, and performance optimizations",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Neon"],
      impact: "100 Lighthouse scores across all categories",
      type: "Portfolio / Admin Dashboard"
    },
    {
      name: "Full Stack Applications",
      description: "Various full-stack applications including expense tracking, real-time features, and user authentication systems",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.IO"],
      impact: "Complete development cycle experience",
      type: "Full Stack Apps"
    }
  ],

  strengths: [
    "Unique combination of IT infrastructure knowledge and modern web development skills",
    "Strong debugging and problem-solving abilities from technical support background",
    "Security-conscious development with cyber security education",
    "User-focused approach - understands both technical and user perspectives",
    "Excellent technical documentation and communication skills",
    "Experience with the complete development lifecycle"
  ],

  currentFocus: [
    "Building production-ready React/Next.js applications",
    "AWS cloud services and serverless architecture",
    "Performance optimization and accessibility",
    "Full-stack TypeScript development"
  ],

  contact: {
    portfolio: "aaronaperez.dev",
    github: "github.com/AaronAPerez",
    linkedin: "linkedin.com/in/aaronaperez",
    email: "Available via contact form"
  }
};

// Pattern matchers for different query types
const patterns = {
  skills: /skill|technolog|know|can he|proficien|stack|language|framework/i,
  frontend: /frontend|front-end|react|next|ui|css|tailwind|html|javascript|typescript/i,
  backend: /backend|back-end|server|node|api|express|python|database/i,
  cloud: /aws|cloud|lambda|s3|ec2|azure|devops|deploy|vercel|docker/i,
  database: /database|data|sql|postgres|mongo|prisma/i,
  projects: /project|built|created|work|portfolio|made|develop/i,
  experience: /experience|background|history|career|job/i,
  education: /education|degree|study|school|learn|certif|training/i,
  strengths: /strength|what makes|why hire|unique|stand out|different|better/i,
  contact: /contact|reach|email|hire|connect|linkedin|github/i,
  intro: /who|tell me about|introduce|about aaron|who is/i,
  availability: /available|looking|hire|open to|seeking|job/i
};

// Generate contextual response based on user query
function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // Skills - Frontend specific
  if (patterns.skills.test(message) && patterns.frontend.test(message)) {
    return `Aaron's frontend expertise includes:\n\n🎨 **Core Technologies**\n${portfolioData.skills.frontend.slice(0, 5).join(', ')}\n\n📱 **UI & Styling**\n${portfolioData.skills.frontend.slice(5).join(', ')}\n\nHe builds responsive, accessible applications with modern React patterns, TypeScript for type safety, and focuses on achieving 100 Lighthouse performance scores.`;
  }

  // Skills - Backend specific
  if (patterns.skills.test(message) && patterns.backend.test(message)) {
    return `Aaron's backend capabilities include:\n\n⚙️ **Server-Side**\n${portfolioData.skills.backend.join(', ')}\n\n💾 **Databases**\n${portfolioData.skills.database.join(', ')}\n\nHis IT background gives him strong understanding of system architecture, security, and building robust APIs.`;
  }

  // Skills - Cloud & AWS specific
  if (patterns.cloud.test(message)) {
    return `Aaron has hands-on experience with cloud technologies:\n\n☁️ **AWS Services**\nS3, Lambda, EC2, DynamoDB, CloudFront, IAM\n\n🚀 **Deployment & DevOps**\n${portfolioData.skills.cloud.join(', ')}\n\nHe can architect and deploy scalable cloud solutions with a focus on performance and cost optimization.`;
  }

  // Skills - Database specific
  if (patterns.database.test(message)) {
    return `Aaron works with both SQL and NoSQL databases:\n\n💾 **Database Technologies**\n${portfolioData.skills.database.join(', ')}\n\nHe understands database design, optimization, and when to use different database types for specific use cases.`;
  }

  // Skills - General
  if (patterns.skills.test(message)) {
    const { skills } = portfolioData;
    return `Aaron is a Full Stack Developer with expertise across the stack:\n\n🎨 **Frontend**: ${skills.frontend.slice(0, 5).join(', ')}\n\n⚙️ **Backend**: ${skills.backend.slice(0, 4).join(', ')}\n\n💾 **Databases**: ${skills.database.slice(0, 4).join(', ')}\n\n☁️ **Cloud & Tools**: AWS, Vercel, Docker, Git\n\n🔧 **IT Background**: ${skills.itBackground.slice(0, 3).join(', ')}\n\nAsk about any specific area for more details!`;
  }

  // Projects
  if (patterns.projects.test(message)) {
    const projectList = portfolioData.projects.map(p =>
      `**${p.name}**\n${p.description}\n_Tech: ${p.technologies.slice(0, 4).join(', ')}_`
    ).join('\n\n');

    return `Here are some of Aaron's key projects:\n\n${projectList}\n\nEach project demonstrates his ability to handle the complete development lifecycle from planning to deployment.`;
  }

  // Experience & Background
  if (patterns.experience.test(message)) {
    return `Aaron has a unique professional background:\n\n🎓 **Education**\n• BS in Information Systems & Cyber Security (3.5 GPA)\n• AS in Network Systems Administration\n• Full Stack Development Training at CodeStack Academy\n\n💼 **IT Background**\nExtensive experience in network administration, technical support, and system management\n\n💻 **Current Focus**\n${portfolioData.currentFocus.join(', ')}\n\nThis combination gives him rare insight into both infrastructure and application development.`;
  }

  // Education
  if (patterns.education.test(message)) {
    const { education } = portfolioData;
    return `Aaron's educational background:\n\n🎓 **Degrees**\n• ${education.degrees[0].type} in ${education.degrees[0].field} (${education.degrees[0].gpa} GPA)\n• ${education.degrees[1].type} in ${education.degrees[1].field}\n\n📚 **Current Training**\n${education.currentTraining.program} at ${education.currentTraining.institution}\n\nFocus: ${education.currentTraining.focus}`;
  }

  // Strengths / Why Hire
  if (patterns.strengths.test(message)) {
    const strengths = portfolioData.strengths.map(s => `✨ ${s}`).join('\n');
    return `What makes Aaron stand out:\n\n${strengths}\n\nHis IT support background gives him exceptional debugging skills and deep understanding of how systems work together.`;
  }

  // Availability
  if (patterns.availability.test(message)) {
    return `Aaron is actively seeking full-stack development opportunities!\n\n🎯 **Ideal Roles**\n• Full Stack Developer\n• Frontend Developer (React/Next.js)\n• Software Engineer\n\n📍 **Location**\nCalifornia (open to remote opportunities)\n\n💼 **Looking For**\nA role where he can leverage both his development skills and IT background to build impactful applications.\n\nConnect via the contact section or LinkedIn to discuss opportunities!`;
  }

  // Contact
  if (patterns.contact.test(message)) {
    return `Connect with Aaron:\n\n🌐 **Portfolio**: aaronaperez.dev\n💼 **LinkedIn**: linkedin.com/in/aaronaperez\n🐙 **GitHub**: github.com/AaronAPerez\n📧 **Email**: Use the contact form on the portfolio\n\nHe's actively looking for full-stack development opportunities and would love to hear from you!`;
  }

  // Introduction / About
  if (patterns.intro.test(message)) {
    return `Aaron A. Perez is a Full Stack Developer based in California with a unique combination of IT infrastructure expertise and modern web development skills.\n\n🎓 **Background**: BS in Information Systems & Cyber Security, currently completing full-stack training at CodeStack Academy\n\n💻 **Specializes in**: React, Next.js, TypeScript, Node.js, and AWS cloud services\n\n✨ **What makes him unique**: His IT support background gives him exceptional problem-solving skills and a deep understanding of both infrastructure and application development\n\nWhat would you like to know more about?`;
  }

  // Default / Help response
  return `I can tell you about Aaron! Here's what I know:\n\n💻 **Technical Skills** - Frontend, backend, databases, cloud\n📁 **Projects** - Web apps, business sites, full-stack applications\n🎓 **Education** - Degrees, training, certifications\n💼 **Experience** - IT background, development work\n✨ **Strengths** - What makes him a great hire\n📬 **Contact** - How to reach him\n\nWhat would you like to know?`;
}

// POST handler for chat messages
export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    // Trim and validate message length
    const trimmedMessage = message.trim();
    if (trimmedMessage.length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long' },
        { status: 400 }
      );
    }

    // Generate response from knowledge base
    const response = generateResponse(trimmedMessage);

    return NextResponse.json({
      message: response,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Assistant Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// GET handler for health check
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'ai-assistant',
    timestamp: new Date().toISOString()
  });
}

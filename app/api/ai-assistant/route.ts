import { NextRequest, NextResponse } from 'next/server';

// Portfolio knowledge base
const portfolioData = {
  name: "Aaron A. Perez",
  role: "Full Stack Developer",
  education: {
    degree: "Applied Science in Network Systems Administration & BS in Information Systems and Cyber Security",
    school: "ITT Technical Institute",
    gpa: "3.5",
    training: "CodeStack Academy - Full Stack Development"
  },
  skills: {
    frontend: [
      "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS",
      "HTML5", "CSS3", "Framer Motion", "Responsive Design"
    ],
    backend: [
      "Node.js", "Express", "Python", "RESTful APIs", "GraphQL"
    ],
    database: [
      "PostgreSQL", "MongoDB", "MySQL", "DynamoDB"
    ],
    cloud: [
      "AWS (S3, Lambda, EC2, DynamoDB)", "Vercel", "Docker"
    ],
    tools: [
      "Git", "GitHub", "VS Code", "Postman", "Figma"
    ],
    other: [
      "IT Support", "Network Administration", "Cyber Security",
      "Technical Troubleshooting", "System Administration"
    ]
  },
  experience: [
    {
      company: "CodeStack Academy",
      role: "Full Stack Development Student",
      description: "Building modern web applications using React, Next.js, Node.js, and AWS. Creating full-stack projects including expense tracking applications, business websites, and web-based games."
    },
    {
      company: "IT Support Background",
      role: "Technical Support Professional",
      description: "Experience in network systems administration, technical troubleshooting, and IT support. Strong foundation in system architecture and security principles."
    }
  ],
  projects: [
    {
      name: "Expense Tracking Application",
      description: "Full-stack expense management app with user authentication and data visualization",
      technologies: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      name: "Business Website Portfolio",
      description: "Modern, responsive business websites with animations and optimized performance",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
    },
    {
      name: "Web-based Games",
      description: "Interactive games demonstrating front-end skills and state management",
      technologies: ["React", "JavaScript", "Canvas API"]
    }
  ],
  strengths: [
    "Unique perspective combining IT support background with full-stack development",
    "Strong problem-solving skills from troubleshooting experience",
    "User-focused approach to application development",
    "Security-conscious development practices",
    "Excellent technical communication skills"
  ],
  contact: {
    email: "Available on portfolio",
    github: "github.com/aaronaperez",
    linkedin: "Available on portfolio",
    portfolio: "aaronaperez.dev"
  }
};

// Generate AI response based on portfolio data
function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // Skills queries
  if (message.includes('skill') || message.includes('technolog') || message.includes('know') || message.includes('can he')) {
    if (message.includes('frontend') || message.includes('front-end') || message.includes('react')) {
      return `Aaron is proficient in modern frontend technologies including ${portfolioData.skills.frontend.join(', ')}. He specializes in building responsive, performant web applications with React and Next.js, using TypeScript for type safety and Tailwind CSS for styling.`;
    }
    if (message.includes('backend') || message.includes('back-end') || message.includes('server')) {
      return `For backend development, Aaron works with ${portfolioData.skills.backend.join(', ')}. He builds RESTful APIs and handles server-side logic efficiently.`;
    }
    if (message.includes('aws') || message.includes('cloud')) {
      return `Aaron has experience with AWS cloud services including ${portfolioData.skills.cloud.join(', ')}. He can deploy and manage cloud infrastructure effectively.`;
    }
    if (message.includes('database') || message.includes('data')) {
      return `Aaron works with various databases: ${portfolioData.skills.database.join(', ')}. He understands both SQL and NoSQL database design and optimization.`;
    }
    return `Aaron is a Full Stack Developer with expertise in:\n\n🎨 Frontend: ${portfolioData.skills.frontend.slice(0, 5).join(', ')}\n⚙️ Backend: ${portfolioData.skills.backend.slice(0, 4).join(', ')}\n💾 Databases: ${portfolioData.skills.database.join(', ')}\n☁️ Cloud: AWS, Vercel, Docker\n\nHe also has a strong IT support background with experience in network administration and cybersecurity.`;
  }

  // Projects queries
  if (message.includes('project') || message.includes('built') || message.includes('created') || message.includes('work')) {
    return `Aaron has built several impressive projects at CodeStack Academy:\n\n📊 **Expense Tracking App** - Full-stack application with authentication and data visualization\n🌐 **Business Websites** - Modern, responsive sites with animations and optimal performance\n🎮 **Web-based Games** - Interactive games showcasing frontend skills\n\nAll projects demonstrate his ability to handle the complete development cycle from planning to deployment.`;
  }

  // Experience queries
  if (message.includes('experience') || message.includes('background') || message.includes('history')) {
    return `Aaron has a unique background that combines:\n\n🎓 **Education**: BS in Information Systems & Cyber Security from ITT Technical Institute (3.5 GPA)\n💻 **Current Training**: Full Stack Development at CodeStack Academy\n🔧 **IT Background**: Experience in network systems administration and technical support\n\nThis combination gives him a rare perspective - he understands both the technical infrastructure AND how to build user-friendly applications on top of it.`;
  }

  // Education queries
  if (message.includes('education') || message.includes('degree') || message.includes('study') || message.includes('learn')) {
    return `Aaron holds a ${portfolioData.education.degree} from ${portfolioData.education.school} with a ${portfolioData.education.gpa} GPA. He's currently expanding his development skills through ${portfolioData.education.training}, where he's building modern full-stack applications.`;
  }

  // Strengths queries
  if (message.includes('strength') || message.includes('what makes') || message.includes('why hire') || message.includes('unique')) {
    return `What makes Aaron stand out:\n\n✨ ${portfolioData.strengths.join('\n✨ ')}\n\nHis IT support background gives him exceptional debugging skills and a deep understanding of how systems work together, making him excellent at building robust, scalable applications.`;
  }

  // Contact queries
  if (message.includes('contact') || message.includes('reach') || message.includes('email') || message.includes('hire')) {
    return `You can connect with Aaron through:\n\n📧 Email: Check the contact section on his portfolio\n💼 LinkedIn: Available in the social links\n🐙 GitHub: github.com/aaronaperez\n🌐 Portfolio: aaronaperez.dev\n\nFeel free to reach out - he's actively seeking full-stack development opportunities!`;
  }

  // General intro
  if (message.includes('who') || message.includes('tell me about') || message.includes('introduce')) {
    return `Aaron A. Perez is a Full Stack Developer with a unique background combining IT support expertise and modern web development skills. He graduated with a BS in Information Systems & Cyber Security (3.5 GPA) and is currently completing full-stack development training at CodeStack Academy.\n\nHe specializes in building intuitive, robust applications using React, Next.js, Node.js, and AWS. His IT support background gives him exceptional problem-solving skills and a deep understanding of system architecture.\n\nWhat specific aspect would you like to know more about?`;
  }

  // Default response
  return `I'd be happy to tell you more about Aaron! I can answer questions about:\n\n💻 His technical skills and technologies\n📁 Projects he's built\n🎓 Education and training background\n💼 Experience and strengths\n📬 How to contact him\n\nWhat would you like to know?`;
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      );
    }

    // Generate response from knowledge base
    const response = generateResponse(message);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error('AI Assistant Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

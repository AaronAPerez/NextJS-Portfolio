import { Project } from "../types/project";

export const projects: Project = [
  {
    id: 'amp-vending',
    title: "AMP Vending",
    description: "Modern vending machine service website featuring responsive design, service information, and product catalog. Built with attention to accessibility and user experience.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Responsive Design"],
    images: ["/images/projects/amp-vending/amp-vending-1.png"],
    imagesAlt: ["/images/projects/amp-vending/amp-vending-1.png"],
    demoLink: "https://www.ampvendingmachines.com",
    codeLink: "https://github.com/AaronAPerez/AMP-Vending_Website",
    websiteLink: "https://www.ampvendingmachines.com",
    gradient: {
      from: "#FD5A1E", // orange
      to: "#A5ACAF"    // silver
    }
  },
    {
    id: 'cloudgov-dashboard',
    title: "CloudGov Dashboard",
    description: "Production-ready enterprise cloud governance platform for AWS resource management, cost optimization, and security compliance. Demonstrates full-stack development expertise with real-time monitoring, AI-powered recommendations, and comprehensive testing. Built for LLNL Junior Software Developer position showcasing modern development practices and measurable business impact ($150K+ annual cost savings).",
    tech: [
      "Next.js 14",
      "React 18", 
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "SWR",
      "Recharts",
      "Jest",
      "Playwright",
      "Zod",
      "RESTful API",
      "CI/CD",
      "Docker"
    ],
    images: ["/images/projects/cloudgov-dashboard/cloudgov-1.png"],
    imagesAlt: ["/images/projects/cloudgov-dashboard/cloudgov-dashboard-preview.png"],
    demoLink: "https://cloudgov-dashboard.vercel.app",
    codeLink: "https://github.com/YOUR_USERNAME/cloudgov-dashboard",
    websiteLink: "https://cloudgov-dashboard.vercel.app",
    gradient: {
      from: "#2563EB", // Primary blue
      to: "#16A34A"    // Success green
    }
  },
  {
    id: 'glamping-spot',
    title: "The Glamping Spot",
    description: "Luxury camping booking platform with interactive map, reservation system, and user reviews. Responsive design optimized for all devices.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Node.js", "Express", "MongoDB", "Mapbox API"],
    images: ["/images/projects/theglampingspot/glamping-1.png"],
    imagesAlt: ["/images/projects/theglampingspot/glamping-1.png"],
    demoLink: "https://www.theglampingspot.net",
    codeLink: "https://github.com/AaronAPerez/the-glamping-spot",
    websiteLink: "https://www.theglampingspot.net",
    gradient: {
      from: "#F59E0B",
      to: "#15803D"
    }
  },
  {
    id: 'goldmine-communications',
    title: "Goldmine Communications & Construction",
    description: "Modern website for telecommunications infrastructure company featuring responsive design, dynamic content sections, and professional branding. Built with Next.js and TypeScript.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
    images: ["/images/projects/goldmine_website/goldmine_1.svg"],
    imagesAlt: ["/images/projects/goldmine_website/goldmine_1.svg"],
    demoLink: "https://www.goldminecomm.net",
    codeLink: "https://github.com/AaronAPerez/Goldmine_Communications_Construction_Website",
    websiteLink: "https://www.goldminecomm.net",
    gradient: {
      from: "#bf9b30",
      to: "#d4af37" 
    }
  },
];
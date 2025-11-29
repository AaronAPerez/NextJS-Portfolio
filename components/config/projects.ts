export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: "production" | "portfolio" | "coursework";
  isLive: boolean;
  clientType?: "business" | "personal" | "demo";
  featured: boolean;
  images: string[];
  imagesAlt: string[];
  demoLink?: string;
  codeLink: string;
  websiteLink?: string;
  gradient?: { from: string; to: string };
}

export const projects: Project[] = [
  {
    id: "amp-vending",
    title: "AMP Vending",
    description:
      "Production website for local vending machine business. Live and actively used by real business.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Responsive Design"],
    category: "production",
    isLive: true,
    clientType: "business",
    featured: true,
    images: ["/images/projects/amp-vending/amp-vending-1.png"],
    imagesAlt: ["/images/projects/amp-vending/amp-vending-1.png"],
    demoLink: "https://www.ampvendingmachines.com",
    codeLink: "https://github.com/AaronAPerez/AMP-Vending_Website",
    websiteLink: "https://www.ampvendingmachines.com",
    gradient: {
      from: "#FD5A1E", // orange
      to: "#A5ACAF", // silver
    },
  },
  {
    id: "cloudgov-dashboard",
    title: "CloudGov Dashboard",
    description:
      "Enterprise cloud management platform built to demonstrate qualifications for LLNL Software Developer position. Showcases full-stack skills, testing, and production-ready code.",
    tech: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "Jest",
      "Playwright",
    ],
    category: "portfolio",
    isLive: true,
    clientType: "demo",
    featured: true,
    images: ["/images/projects/cloudgov-dashboard/cloudgov-1.png"],
    imagesAlt: [
      "/images/projects/cloudgov-dashboard/cloudgov-dashboard-preview.png",
    ],
    demoLink: "https://cloudgov-dashboard.vercel.app",
    codeLink: "https://github.com/YOUR_USERNAME/cloudgov-dashboard",
    websiteLink: "https://cloudgov-dashboard.vercel.app",
    gradient: {
      from: "#2563EB", // Primary blue
      to: "#16A34A", // Success green
    },
  },
  {
    id: "glamping-spot",
    title: "The Glamping Spot",
    description:
      "Booking platform for luxury camping locations. Real production website with interactive features.",
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Node.js",
      "Express",
      "MongoDB",
      "Mapbox API",
    ],
    category: "production",
    isLive: true,
    clientType: "business",
    featured: true,
    images: ["/images/projects/theglampingspot/glamping-1.png"],
    imagesAlt: ["/images/projects/theglampingspot/glamping-1.png"],
    demoLink: "https://www.theglampingspot.net",
    codeLink: "https://github.com/AaronAPerez/the-glamping-spot",
    websiteLink: "https://www.theglampingspot.net",
    gradient: {
      from: "#F59E0B",
      to: "#15803D",
    },
  },
  {
    id: "goldmine-communications",
    title: "Goldmine Communications & Construction",
    description:
      "Production website for telecommunications infrastructure company. Responsive design with professional branding.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
    category: "production",
    isLive: true,
    clientType: "business",
    featured: true,
    images: ["/images/projects/goldmine_website/goldmine_1.svg"],
    imagesAlt: ["/images/projects/goldmine_website/goldmine_1.svg"],
    demoLink: "https://www.goldminecomm.net",
    codeLink:
      "https://github.com/AaronAPerez/Goldmine_Communications_Construction_Website",
    websiteLink: "https://www.goldminecomm.net",
    gradient: {
      from: "#bf9b30",
      to: "#d4af37",
    },
  },
  {
    id: "portfolio-v3",
    title: "Portfolio Website v3.0",
    description:
      "Personal portfolio built with Next.js 15, React 19, and TypeScript. Demonstrates advanced patterns, accessibility, and performance optimization with 100 Lighthouse scores.",
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
    category: "portfolio",
    isLive: true,
    featured: true,
    images: ["/images/projects/portfolio-v3/hero.png"],
    imagesAlt: ["Portfolio homepage"],
    demoLink: "https://aaronaperez.dev",
    codeLink: "https://github.com/AaronAPerez/NextJS-Portfolio",
    gradient: { from: "#6366F1", to: "#8B5CF6" },
  },
];

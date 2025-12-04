export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: 'production' | 'portfolio' | 'coursework';
  isLive: boolean;
  clientType?: 'business' | 'personal' | 'demo';
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
    id: 'amp-vending',
    title: "AMP Vending",
    description: "Production website for local vending machine business. Live and actively used by real business.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Responsive Design"],
    category: 'production',
    isLive: true,
    clientType: 'business',
    featured: true,
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
    id: 'goldmine-communications',
    title: "Goldmine Comm & Construction",
    description: "Production website for telecommunications infrastructure company. Responsive design with professional branding.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind"],
    category: 'production',
    isLive: true,
    clientType: 'business',
    featured: true,
    images: ["/images/projects/goldmine/Goldmine-Hero-Screenshot.png"],
    imagesAlt: ["/images/projects/goldmine/Goldmine-Hero-Screenshot.png"],
    demoLink: "https://www.goldminecomm.net",
    codeLink: "https://github.com/AaronAPerez/Goldmine_Communications_Construction_Website",
    websiteLink: "https://www.goldminecomm.net",
    gradient: {
      from: "#bf9b30",
      to: "#d4af37" 
    }
  },
  {
    id: 'glamping-spot',
    title: "The Glamping Spot",
    description: "Booking platform for luxury camping locations. Real production website with interactive features.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Node.js"],
    category: 'production',
    isLive: true,
    clientType: 'business',
    featured: true,
    images: ["/images/projects/the-glamping-spot/Glamping-Spot-Hero-Screenshot.png"],
    imagesAlt: ["/images/projects/the-glamping-spot/Glamping-Spot-Hero-Screenshot.png"],
    demoLink: "https://www.theglampingspot.net",
    codeLink: "https://github.com/AaronAPerez/the-glamping-spot",
    websiteLink: "https://www.theglampingspot.net",
    gradient: {
      from: "#F59E0B",
      to: "#15803D"
    }
  },
];
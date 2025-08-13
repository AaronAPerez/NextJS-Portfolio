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
  
  {
    id: 'game-database',
    title: "Video Game Database",
    description: "Feature-rich video game discovery platform using RAWG.IO API. Users can search games, apply multiple filters, view detailed game information, and sort by various criteria such as genre, platform, and ratings. Built with React, TypeScript and Chakra UI, emphasizing responsive design and accessibility.",
    tech: [
      "React", 
      "TypeScript", 
      "Chakra UI", 
      "Axios", 
      "React Query",
      "React Router",
      "RAWG API"
    ],
    images: ["/images/projects/game-database/GameAPI.svg"],
    imagesAlt: ["/images/projects/game-database/GameAPI.svg"],
    demoLink: "#",
    codeLink: "https://github.com/AaronAPerez/Videogame_API_App",
    gradient: {
      from: "#553C9A", // Purple
      to: "#00B5D8"    // Cyan
    }
  },
];
    

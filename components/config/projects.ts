import { Project } from "../types/project";

export const projects: Project = [
  {
    id: 'glamping-spot',
    title: "The Glamping Spot",
    description: "Luxury camping booking platform with interactive map, reservation system, and user reviews. Responsive design optimized for all devices.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Node.js", "Express", "MongoDB", "Mapbox API"],
    images: ["/images/projects/the-glamping-spot/glamping-1.png"],
    codeLink: "https://github.com/AaronAPerez/the-glamping-spot",
    websiteLink: "https://www.theglampingspot.net",
    gradient: {
      from: "#F59E0B",
      to: "#15803D"
    }
  },
  {
    id: 'goldmine-communications',
    title: "Goldmine Communications & Construction - IN PROGRESS",
    description: "Modern website for telecommunications infrastructure company featuring responsive design, dynamic content sections, and professional branding. Built with Next.js and TypeScript.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
    images: ["/images/projects/goldmine_website/goldmine_1.svg"],
    codeLink: "https://github.com/AaronAPerez/Goldmine_Communications_Construction_Website",
    demoLink: "https://goldmine-communications-website.vercel.app/",
    gradient: {
      from: "#FFD700",
      to: "#DAA520" 
    }
  },
  {
    id: 'interactive-form',
    title: "Interactive Form System",
    description: "A dynamic form system with conditional logic, validation, and real-time preview capabilities.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "React Hook Form"],
    images: ["/images/projects/interactive-form/interactive-form-1.svg"],
    codeLink: "https://github.com/AaronAPerez/form-showcase",
    websiteLink: "https://form-showcase.vercel.app//",
    gradient: {
      from: "#8B5CF6",
      to: "#EC4899"
    }
  },
  {
    id: 'data-migration-tool',
    title: "Data Migration Tool",
    description: "Enterprise-grade tool for seamless data migration between systems with validation, transformation, and error handling.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind", "Node.js", "TypeScript", "Express", "MongoDB"],
    images: ["/images/projects/data-migration-tool/data-migration-1.svg"],
    codeLink: "https://github.com/AaronAPerez/data-migration-tool",
    websiteLink: "https://data-migration-demo.vercel.app/",
    gradient: {
      from: "#10B981",
      to: "#3B82F6"
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
    codeLink: "https://github.com/AaronAPerez/Videogame_API_App",
    demoLink: "https://videogame-api-app.vercel.app/",
    gradient: {
      from: "#553C9A", // Purple
      to: "#00B5D8"    // Cyan
    }
  },
];
    // technical: [
    //   "Implemented React Query for efficient API data caching and management",
    //   "Built custom hooks for search and filter logic",
    //   "Used TypeScript interfaces for type-safe API responses",
    //   "Optimized performance with debounced search",
    //   "Integrated Chakra UI components for consistent design",
    //   "Implemented responsive design using Chakra UI's responsive styles",
    //   "Added keyboard navigation and screen reader support"
    // ]
//   },
//   {
//     id: 'expense-tracker',
//     title: "Expense Tracker",
//     description: "Full-stack expense tracking application with real-time updates and visualization. Built with TypeScript, React, and .NET",
//     tech: ["TypeScript", "React", "Bootstrap", ".NET", "SQL Server"],
//     images: ["/images/projects/expense-tracker/expense-tracker-1.png"],
//     codeLink: "https://github.com/AaronAPerez/FullStack_Expense_App_Part-2/tree/Set",
//     gradient: {
//       from: "#c49a1c",
//       to: "#ffd700"
//     }
//   }
// ];

  // {
  //   id: 'west-valley-bowl',
  //   title: "West Valley Bowl",
  //   description: "Modern business website redesign with online booking system. Features responsive design and dynamic content management.",
  //   tech: ["Bootstrap", "HTML5", "CSS3", "JavaScript"],
  //   images: ["/images/projects/bowling/bowling-1.png"],
  //   codeLink: "https://github.com/AaronAPerez/Webpage-Redevelopment-Bowling-",
  //   gradient: {
  //     from: "#358FEF",
  //     to: "#60a5fa"
  //   }
  // },
  // {
  //   id: 'game-wrld',
  //   title: "Game WRLD",
  //   description: "Video game database using RAWG.io API. Includes advanced search, filtering, and user collections.",
  //   tech: ["React", "TypeScript", "Tailwind", ".NET"],
  //   images: ["/images/projects/game-wrld/game-wrld-1.png"],
  //   codeLink: "https://github.com/AaronAPerez/Game_WRLD-Fullstack-Final-App-Project/tree/A1_Branch",
  //   gradient: {
  //     from: "#4F46E5",
  //     to: "#06B6D4"
  //   }
  // }
    // features: [
    //   "Dynamic search with debouncing",
    //   "Advanced filtering system",
    //   "Infinite scroll pagination",
    //   "Responsive grid layout",
    //   "Dark/Light mode toggle",
    //   "Loading skeletons",
    //   "Error handling",
    //   "Accessibility optimized"
    // ],
import { Project } from "../types/project";

export const projects: Project = [
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
    features: [
      "Dynamic search with debouncing",
      "Advanced filtering system",
      "Infinite scroll pagination",
      "Responsive grid layout",
      "Dark/Light mode toggle",
      "Loading skeletons",
      "Error handling",
      "Accessibility optimized"
    ],
    images: ["/images/projects/game-database/GameAPI.svg"], // Update with actual image path
    codeLink: "https://github.com/AaronAPerez/Videogame_API_App", // Update with actual repo
    demoLink: "https://videogame-api-app.vercel.app/",
    gradient: {
      from: "#553C9A", // Purple
      to: "#00B5D8"    // Cyan
    },
    technical: [
      "Implemented React Query for efficient API data caching and management",
      "Built custom hooks for search and filter logic",
      "Used TypeScript interfaces for type-safe API responses",
      "Optimized performance with debounced search",
      "Integrated Chakra UI components for consistent design",
      "Implemented responsive design using Chakra UI's responsive styles",
      "Added keyboard navigation and screen reader support"
    ]
  },
  {
    id: 'goldmine-communications',
    title: "Goldmine Communications - IN PROGRESS....",
    description: "Modern website for telecommunications infrastructure company featuring responsive design, dynamic content sections, and professional branding. Built with Next.js and TypeScript.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind"],
    images: ["/projects/goldmine_website/goldmine_1.svg"],
    codeLink: "https://github.com/AaronAPerez/Goldmine_Communications_Construction_Website",
    demoLink: "https://goldmine-communications-website.vercel.app/",
    gradient: {
      from: "#FFD700",
      to: "#DAA520" 
    }
  },
  {
    id: 'expense-tracker',
    title: "Expense Tracker",
    description: "Full-stack expense tracking application with real-time updates and visualization. Built with TypeScript, React, and .NET",
    tech: ["TypeScript", "React", "Bootstrap", ".NET", "SQL Server"],
    images: ["/images/projects/expense-tracker/expense-tracker-1.png"],
    codeLink: "https://github.com/AaronAPerez/FullStack_Expense_App_Part-2/tree/Set",
    gradient: {
      from: "#c49a1c",
      to: "#ffd700"
    }
  },
  {
    id: 'west-valley-bowl',
    title: "West Valley Bowl",
    description: "Modern business website redesign with online booking system. Features responsive design and dynamic content management.",
    tech: ["Bootstrap", "HTML5", "CSS3", "JavaScript"],
    images: ["/images/projects/bowling/bowling-1.png"],
    codeLink: "https://github.com/AaronAPerez/Webpage-Redevelopment-Bowling-",
    gradient: {
      from: "#358FEF",
      to: "#60a5fa"
    }
  },
  {
    id: 'game-wrld',
    title: "Game WRLD",
    description: "Video game database using RAWG.io API. Includes advanced search, filtering, and user collections.",
    tech: ["React", "TypeScript", "Tailwind", ".NET"],
    images: ["/images/projects/game-wrld/game-wrld-1.png"],
    codeLink: "https://github.com/AaronAPerez/Game_WRLD-Fullstack-Final-App-Project/tree/A1_Branch",
    gradient: {
      from: "#4F46E5",
      to: "#06B6D4"
    }
  }
];
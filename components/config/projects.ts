import { Project } from '@/types/project';

export const projects: Project[] = [
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
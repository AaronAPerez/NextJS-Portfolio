import React from 'react'
import { Home, User, Code2, FileText, Mail } from 'lucide-react';
import { FloatingNav } from './FloatingNavbar';



const Navigation = () => {
const navItems = [
  {
    name: "Home",
    link: "#home",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "About",
    link: "#about",
    icon: <User className="h-4 w-4" />,
  },
  {
    name: "Projects",
    link: "#projects",
    icon: <Code2 className="h-4 w-4" />,
  },
  {
    name: "Experience",
    link: "#experience",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    name: "Skills",
    link: "#skills",
    icon: <Mail className="h-4 w-4" />,
  },
];

  return (
        <div className="relative w-full z-50">
            <FloatingNav navItems={navItems} />
        </div>
  );
};

export default Navigation;
/**
 * Core Type Definitions for Portfolio
 * Provides type safety and IntelliSense throughout the application
 */

// Project Types
export interface Project {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  results: string[];
  technologies: Technology[];
  features: string[];
  challenges: Challenge[];
  images: ProjectImages;
  links: ProjectLinks;
  category: ProjectCategory;
  featured: boolean;
  completedDate: string;
  client?: string;
  testimonial?: Testimonial;
}

export interface ProjectImages {
  hero: string;
  thumbnail: string;
  screenshots: string[];
  mockups?: string[];
}

export interface ProjectLinks {
  live?: string;
  github?: string;
  caseStudy?: string;
}

export interface Challenge {
  title: string;
  problem: string;
  solution: string;
  learned: string;
}

export type ProjectCategory = 
  | 'Web Application'
  | 'E-commerce'
  | 'Business Website'
  | 'Portfolio'
  | 'API Development'
  | 'Dashboard'
  | 'Mobile App';

// Technology/Skill Types
export interface Technology {
  name: string;
  icon?: string;
  category: TechCategory;
  proficiency?: ProficiencyLevel;
}

export interface Skill {
  name: string;
  icon?: string;
  proficiency: ProficiencyLevel;
  category: SkillCategory;
  yearsOfExperience?: number;
}

export type TechCategory = 
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'DevOps'
  | 'Tools'
  | 'Testing';

export type SkillCategory =
  | 'Frontend Development'
  | 'Backend Development'
  | 'Tools & DevOps'
  | 'Specializations';

export type ProficiencyLevel = 
  | 'Beginner' 
  | 'Intermediate' 
  | 'Advanced' 
  | 'Expert';

// Experience Types
export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | 'Present';
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
}

// Education Types
export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  highlights?: string[];
  fieldOfStudy?: string;
  coursework?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  image?: string;
  quote: string;
  rating?: number;
  date?: string;
  relationship: 'Client' | 'Colleague' | 'Manager' | 'Instructor';
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  budget?: string;
  projectType?: string;
  timeline?: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

// Navigation Types
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username?: string;
}

// SEO Types
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogType?: string;
  twitterHandle?: string;
  canonicalUrl?: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

// Blog/Article Types (Optional - for future blog)
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedDate: string;
  updatedDate?: string;
  tags: string[];
  category: string;
  readTime: string;
  featured: boolean;
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export interface CardProps {
  variant?: 'default' | 'bordered' | 'elevated';
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  error?: string;
}

// Analytics Types
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}
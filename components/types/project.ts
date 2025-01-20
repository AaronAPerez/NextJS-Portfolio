export interface Project {
  imageAlt: string;
  id: string;
  title: string;
  description: string;
  tech: string[];
  images: string[];
  codeLink: string;
  demoLink?: string;
  gradient?: {
    from: string;
    to: string;
  };
  delay?: number;
}
export interface Project {
  imageAlt: string;
  id: string;
  title: string;
  description: string;
  tech: string[];
  images: string[];
  imagesAlt: string[];
  demoLink?: string;
  codeLink: string;
  websiteLink?: string;
  gradient?: {
    from: string;
    to: string;
  };
  delay?: number;
}
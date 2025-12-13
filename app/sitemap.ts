import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.aaronaperez.dev/", lastModified: new Date() },
    { url: "https://www.aaronaperez.dev/about", lastModified: new Date() },
    { url: "https://www.aaronaperez.dev/projects", lastModified: new Date() },
    { url: "https://www.aaronaperez.dev/skills", lastModified: new Date() },
    { url: "https://www.aaronaperez.dev/experience", lastModified: new Date() },
    { url: "https://www.aaronaperez.dev/contact", lastModified: new Date() },
  ];
}
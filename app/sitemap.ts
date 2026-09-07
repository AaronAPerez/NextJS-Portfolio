import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.aaronaperez.dev/", lastModified: new Date() },
    { url: "https://www.aaronaperez.dev/contact", lastModified: new Date() },
    { url: "https://www.aaronaperez.dev/privacy", lastModified: new Date() },
    { url: "https://www.aaronaperez.dev/terms", lastModified: new Date() },
    { url: "https://www.aaronaperez.dev/accessibility", lastModified: new Date() },
  ];
}
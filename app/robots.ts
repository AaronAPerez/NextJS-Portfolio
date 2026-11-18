import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/tools",
          "/invoice",
          "/hosting-options",
          "/api",
        ],
      },
    ],
    sitemap: "https://www.aaronaperez.dev/sitemap.xml",
  };
}
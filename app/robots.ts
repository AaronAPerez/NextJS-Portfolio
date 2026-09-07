import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/test-components",
          "/tools",
          "/invoice",
          "/hosting-options",
          "/blog",
          "/api",
        ],
      },
    ],
    sitemap: "https://www.aaronaperez.dev/sitemap.xml",
  };
}
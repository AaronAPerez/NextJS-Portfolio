Portfolio site is missing some *essential technical pages* that improve SEO, crawlability, and user experience. At minimum ,should add a **custom 404 page**, a **robots.txt**, and a **sitemap.xml**.  

---

## 🗂 Essential Pages & Files for Next.js Sites

| Page/File | Purpose | Why It Matters |
|-----------|---------|----------------|
| **404 page** | Friendly error page when a route doesn’t exist | Improves UX, keeps users engaged, signals professionalism |
| **robots.txt** | Tells search engines what to crawl or ignore | Prevents indexing of private routes, ensures crawlers find important pages |
| **sitemap.xml** | Lists all public URLs | Helps Google/Bing discover your portfolio pages faster |
| **favicon & manifest.json** | Branding + PWA metadata | Ensures consistent appearance in browser tabs and mobile homescreens |
| **humans.txt (optional)** | Credits authors/developers | Adds a personal touch, not required but nice for portfolios |
| **privacy policy / terms** | Legal compliance | Already present on your site footer, good practice for SaaS/portfolio credibility |
| **Open Graph / social preview images** | Controls link previews on social media | Boosts click-through rates when sharing your portfolio |

---

## 🔧 How to Add Them in Next.js (App Router)

### 1. Custom 404 Page
Create `app/not-found.tsx`:
```tsx
export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">404 – Page Not Found</h1>
      <p className="mt-2 text-gray-600">Looks like this page doesn’t exist.</p>
      <a href="/" className="mt-4 text-blue-600 underline">Go back home</a>
    </main>
  );
}
```

### 2. robots.txt
Create `app/robots.ts`:
```ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://www.aaronaperez.dev/sitemap.xml",
  };
}
```

### 3. sitemap.xml
Create `app/sitemap.ts`:
```ts
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
```

---

## ⚠️ Risks if Missing
- **Without 404:** Broken links frustrate users and increase bounce rate.  
- **Without robots.txt:** Crawlers may waste time on irrelevant routes (e.g., `/api`, `/_next`).  
- **Without sitemap.xml:** Search engines may take longer to index your portfolio pages.  

---

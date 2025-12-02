# Performance Optimization Guide

## Current Metrics

- **TTFB**: 212ms ✅ Good
- **FCP**: 2460ms ⚠️ Needs Improvement (Target: <1800ms)

## Why FCP is Slow (2.46 seconds)

FCP measures when the first pixel is painted to the screen. Your FCP of 2.46s means users stare at a white screen for almost 2.5 seconds before seeing ANY content.

### Root Causes

1. **JavaScript blocking render** - React hydration taking too long
2. **Hero section complexity** - Heavy animations/images
3. **No content visible until JS loads** - Client-side only rendering
4. **Framer Motion overhead** - Animation library blocking paint

---

## 🎯 Quick Fixes (Immediate Impact)

### 1. Prioritize Hero Image Loading

In your Hero section, add `priority` to the main image:

```tsx
// components/sections/HeroSection.tsx
import Image from 'next/image';

<Image
  src="/your-hero-image.jpg"
  alt="Hero"
  priority  // ← Add this!
  width={800}
  height={600}
/>
```

### 2. Reduce Initial Animation Complexity

Simplify or delay hero animations:

```tsx
// Before (blocks paint)
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>

// After (instant first paint)
<motion.div
  initial={{ opacity: 1 }}  // Start visible!
  animate={{ opacity: 1 }}
  transition={{ duration: 0 }}
>
```

### 3. Use Static HTML for Above-the-Fold Content

Convert Hero to Server Component (remove 'use client'):

```tsx
// components/sections/HeroSection.tsx
// Remove: 'use client'

export default function HeroSection() {
  // No animations on first paint
  // Static HTML renders immediately
  return (
    <section>
      <h1>Your Name</h1>
      <p>Your tagline</p>
      {/* Add animations client-side after */}
    </section>
  );
}
```

### 4. Defer Non-Critical CSS

Move non-critical styles to separate file:

```tsx
// app/layout.tsx
import './globals.css';  // Critical only
// Load animations.css after paint
```

---

## 📊 Medium-Term Improvements

### 5. Code Splitting Optimization

Already implemented with `dynamic()` but can improve:

```tsx
// app/page.tsx
const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection"),
  {
    loading: () => <SectionLoader />,
    ssr: false  // ✅ Already done
  }
);

// Add: Prefetch on hover
<Link
  href="#about"
  onMouseEnter={() => {
    import("@/components/sections/AboutSection");
  }}
>
```

### 6. Reduce Framer Motion Bundle

Use lightweight alternatives for simple animations:

```tsx
// Before (Framer Motion - 50KB)
import { motion } from 'framer-motion';
<motion.div animate={{ opacity: 1 }}>

// After (CSS - 0KB)
<div className="animate-fade-in">
```

Add to `globals.css`:
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-in;
}
```

### 7. Optimize Icon Libraries

You're using multiple icon libraries:

```tsx
// package.json shows:
- lucide-react
- react-icons
- @tabler/icons-react

// Pick ONE and tree-shake properly
import { Home, User } from 'lucide-react';  // ✅ Good
import * as Icons from 'lucide-react';     // ❌ Bad (imports all)
```

### 8. Image Optimization

Use Next.js Image with blur placeholders:

```tsx
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Hero"
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJ..."  // Low-res base64
  width={800}
  height={600}
/>
```

Generate blur data URL:
```bash
npm install plaiceholder
```

---

## 🔬 Advanced Optimizations

### 9. Streaming SSR (React 18)

Convert to streaming for progressive rendering:

```tsx
// app/page.tsx
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      {/* Instant paint - no Suspense */}
      <HeroSection />

      {/* Stream after */}
      <Suspense fallback={<Loading />}>
        <AboutSection />
      </Suspense>
    </>
  );
}
```

### 10. Resource Hints

Add preconnect for external resources:

```tsx
// app/layout.tsx
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
  <link rel="dns-prefetch" href="https://vercel.live" />
</head>
```

### 11. Critical CSS Inlining

Extract and inline critical CSS:

```bash
npm install critters --save-dev
```

In `next.config.ts`:
```ts
experimental: {
  optimizeCss: true,  // ✅ Already enabled!
}
```

### 12. Remove Render-Blocking Scripts

Defer non-critical scripts:

```tsx
// Before
<Script src="/analytics.js" />

// After
<Script src="/analytics.js" strategy="lazyOnload" />
```

---

## 📈 Measurement & Testing

### Test Locally

```bash
# Build production bundle
npm run build

# Serve and test
npm run start

# Lighthouse in Chrome DevTools
# Cmd+Shift+J → Lighthouse → Mobile → Run
```

### Expected Results After Optimization

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| **FCP** | 2460ms | ~1200ms | <1800ms |
| **LCP** | ? | <2500ms | <2500ms |
| **TTI** | ? | <3800ms | <3800ms |
| **TBT** | ? | <200ms | <200ms |

---

## ✅ Action Plan (Prioritized)

### Week 1: Quick Wins
- [ ] Add `priority` to hero image
- [ ] Simplify hero animations (remove complex Framer Motion)
- [ ] Convert HeroSection to Server Component
- [ ] Consolidate icon libraries to one

### Week 2: Code Splitting
- [ ] Replace Framer Motion with CSS animations for simple effects
- [ ] Add image blur placeholders
- [ ] Implement resource hints (preconnect, dns-prefetch)

### Week 3: Advanced
- [ ] Convert to Streaming SSR with Suspense
- [ ] Extract critical CSS
- [ ] Bundle analysis and tree-shaking

---

## 🔍 Debugging Tools

### Chrome DevTools Performance

1. Open DevTools (F12)
2. Performance tab
3. Record page load
4. Look for:
   - **Long tasks** (>50ms) - blocking render
   - **Script evaluation** - too much JS
   - **Layout shifts** - CLS issues

### Webpack Bundle Analyzer

```bash
# Install
npm install --save-dev @next/bundle-analyzer

# Enable in next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run
ANALYZE=true npm run build
```

### Lighthouse CI

```bash
# Install
npm install -g @lhci/cli

# Run
lhci autorun --collect.url=http://localhost:3000
```

---

## 📚 Resources

- [Web.dev FCP Guide](https://web.dev/fcp/)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Framer Motion Performance](https://www.framer.com/motion/guide-reduce-bundle-size/)
- [Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)

---

**Goal: FCP < 1800ms** (Currently 2460ms → Need to save 660ms)

Most impactful changes:
1. Hero image priority (-200ms)
2. Remove complex animations (-300ms)
3. Code splitting improvements (-160ms)

**Total savings: 660ms → Target achieved! 🎯**

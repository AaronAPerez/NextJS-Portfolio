// BLOG DATA STRUCTURE - data/blog-posts.ts

import { BlogPost, BlogCategory, BlogTag, BlogAuthor } from '@/types/blog';
import { 
  BookOpen, 
  Code, 
  Lightbulb, 
  Zap, 
  Heart, 
  Shield, 
  Smartphone,
  Database
} from 'lucide-react';

/**
 * Blog Author Information
 */
export const author: BlogAuthor = {
  id: 'aaron-perez',
  name: 'Aaron A. Perez',
  role: 'Senior Full Stack Developer',
  avatar: '/images/profile/headshot.png',
  bio: 'Senior Full Stack Developer with 7+ years of experience in React, TypeScript, and .NET. Passionate about performance, accessibility, and creating exceptional user experiences. Based in Stockton, CA and available for remote opportunities.',
  social: {
    twitter: '@aaronaperezdev',
    linkedin: 'https://linkedin.com/in/aaronaperezdev',
    github: 'https://github.com/AaronAPerez',
    website: 'https://aaronaperez.dev'
  }
};

/**
 * Blog Categories
 */
export const blogCategories: BlogCategory[] = [
  {
    id: 'all',
    name: 'All Posts',
    description: 'All technical articles and insights',
    color: 'text-gray-600',
    icon: BookOpen,
    count: 0, // Will be calculated dynamically
    slug: 'all'
  },
  {
    id: 'react',
    name: 'React & TypeScript',
    description: 'Modern React development patterns, hooks, and TypeScript best practices',
    color: 'text-blue-600',
    icon: Code,
    count: 0,
    slug: 'react'
  },
  {
    id: 'performance',
    name: 'Performance',
    description: 'Web performance optimization, Core Web Vitals, and speed improvements',
    color: 'text-green-600',
    icon: Zap,
    count: 0,
    slug: 'performance'
  },
  {
    id: 'accessibility',
    name: 'Accessibility',
    description: 'Building inclusive web experiences that work for everyone',
    color: 'text-purple-600',
    icon: Heart,
    count: 0,
    slug: 'accessibility'
  },
  {
    id: 'best-practices',
    name: 'Best Practices',
    description: 'Industry standards, code quality, and professional development approaches',
    color: 'text-orange-600',
    icon: Lightbulb,
    count: 0,
    slug: 'best-practices'
  },
  {
    id: 'backend',
    name: 'Backend & APIs',
    description: '.NET, Node.js, database design, and API development',
    color: 'text-indigo-600',
    icon: Database,
    count: 0,
    slug: 'backend'
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    description: 'React Native, responsive design, and mobile-first approaches',
    color: 'text-pink-600',
    icon: Smartphone,
    count: 0,
    slug: 'mobile'
  },
  {
    id: 'security',
    name: 'Security',
    description: 'Web security, authentication, and secure coding practices',
    color: 'text-red-600',
    icon: Shield,
    count: 0,
    slug: 'security'
  }
];

/**
 * Blog Tags
 */
export const blogTags: BlogTag[] = [
  // React & Frontend
  { id: 'react', name: 'React', count: 0, slug: 'react' },
  { id: 'typescript', name: 'TypeScript', count: 0, slug: 'typescript' },
  { id: 'nextjs', name: 'Next.js', count: 0, slug: 'nextjs' },
  { id: 'javascript', name: 'JavaScript', count: 0, slug: 'javascript' },
  { id: 'hooks', name: 'React Hooks', count: 0, slug: 'hooks' },
  { id: 'state-management', name: 'State Management', count: 0, slug: 'state-management' },
  
  // Styling & UI
  { id: 'css', name: 'CSS', count: 0, slug: 'css' },
  { id: 'tailwind', name: 'Tailwind CSS', count: 0, slug: 'tailwind' },
  { id: 'ui-ux', name: 'UI/UX', count: 0, slug: 'ui-ux' },
  { id: 'responsive-design', name: 'Responsive Design', count: 0, slug: 'responsive-design' },
  
  // Performance & Optimization
  { id: 'performance', name: 'Performance', count: 0, slug: 'performance' },
  { id: 'core-web-vitals', name: 'Core Web Vitals', count: 0, slug: 'core-web-vitals' },
  { id: 'optimization', name: 'Optimization', count: 0, slug: 'optimization' },
  { id: 'bundle-analysis', name: 'Bundle Analysis', count: 0, slug: 'bundle-analysis' },
  
  // Accessibility
  { id: 'accessibility', name: 'Accessibility', count: 0, slug: 'accessibility' },
  { id: 'a11y', name: 'A11y', count: 0, slug: 'a11y' },
  { id: 'wcag', name: 'WCAG', count: 0, slug: 'wcag' },
  { id: 'screen-readers', name: 'Screen Readers', count: 0, slug: 'screen-readers' },
  
  // Backend & Tools
  { id: 'dotnet', name: '.NET', count: 0, slug: 'dotnet' },
  { id: 'nodejs', name: 'Node.js', count: 0, slug: 'nodejs' },
  { id: 'api-design', name: 'API Design', count: 0, slug: 'api-design' },
  { id: 'database', name: 'Database', count: 0, slug: 'database' },
  
  // Testing & Quality
  { id: 'testing', name: 'Testing', count: 0, slug: 'testing' },
  { id: 'jest', name: 'Jest', count: 0, slug: 'jest' },
  { id: 'playwright', name: 'Playwright', count: 0, slug: 'playwright' },
  { id: 'code-quality', name: 'Code Quality', count: 0, slug: 'code-quality' },
  
  // DevOps & Deployment
  { id: 'deployment', name: 'Deployment', count: 0, slug: 'deployment' },
  { id: 'ci-cd', name: 'CI/CD', count: 0, slug: 'ci-cd' },
  { id: 'vercel', name: 'Vercel', count: 0, slug: 'vercel' },
  { id: 'monitoring', name: 'Monitoring', count: 0, slug: 'monitoring' },
  
  // General
  { id: 'tutorial', name: 'Tutorial', count: 0, slug: 'tutorial' },
  { id: 'guide', name: 'Guide', count: 0, slug: 'guide' },
  { id: 'tips', name: 'Tips', count: 0, slug: 'tips' },
  { id: 'case-study', name: 'Case Study', count: 0, slug: 'case-study' }
];

/**
 * Blog Posts Data
 */
export const blogPosts: BlogPost[] = [
  {
    id: 'react-18-concurrent-features',
    title: 'Mastering React 18 Concurrent Features for Better UX',
    slug: 'react-18-concurrent-features-better-ux',
    excerpt: 'Learn how to leverage React 18\'s concurrent features like Suspense, useTransition, and useDeferredValue to create smoother user experiences and improve perceived performance.',
    content: `
# Mastering React 18 Concurrent Features for Better UX

React 18 introduced powerful concurrent features that fundamentally change how we think about rendering and user experience. In this comprehensive guide, we'll explore how to use these features to create smoother, more responsive applications.

## Understanding Concurrent React

Concurrent React allows the framework to interrupt rendering work to handle more urgent tasks, making your app feel more responsive even during heavy computations.

### Key Benefits:
- **Improved perceived performance**
- **Better user interaction responsiveness**
- **Smoother animations and transitions**
- **Enhanced loading states**

## Suspense for Data Fetching

Suspense lets you declaratively wait for asynchronous operations:

\`\`\`tsx
function UserProfile({ userId }: { userId: string }) {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <UserData userId={userId} />
    </Suspense>
  );
}

function UserData({ userId }: { userId: string }) {
  const user = useSWR(\`/api/users/\${userId}\`, fetcher, {
    suspense: true
  });
  
  return <div>{user.name}</div>;
}
\`\`\`

## useTransition Hook

Mark updates as non-urgent to keep the UI responsive:

\`\`\`tsx
function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery); // Urgent update
    
    startTransition(() => {
      // Non-urgent update
      setResults(performExpensiveSearch(newQuery));
    });
  };

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {isPending && <div>Searching...</div>}
      <ResultsList results={results} />
    </div>
  );
}
\`\`\`

## useDeferredValue Hook

Defer expensive re-renders:

\`\`\`tsx
function ProductList({ searchTerm }: { searchTerm: string }) {
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const products = useMemo(
    () => searchProducts(deferredSearchTerm),
    [deferredSearchTerm]
  );

  return (
    <div className={searchTerm !== deferredSearchTerm ? 'opacity-50' : ''}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
\`\`\`

## Best Practices

1. **Use Suspense boundaries strategically** - Place them where loading states make sense
2. **Combine features** - useTransition and useDeferredValue work great together
3. **Profile your app** - Use React DevTools Profiler to measure improvements
4. **Progressive enhancement** - Start with small changes and build up

## Real-World Example

Here's a complete example combining all features:

\`\`\`tsx
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const handleSearch = (term: string) => {
    startTransition(() => {
      setSearchTerm(term);
    });
  };

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      {isPending && <SearchSpinner />}
      
      <Suspense fallback={<ResultsSkeleton />}>
        <SearchResults searchTerm={searchTerm} />
      </Suspense>
    </div>
  );
}
\`\`\`

React 18's concurrent features represent a major step forward in creating responsive user interfaces. By understanding and implementing these patterns, you can significantly improve your application's perceived performance and user experience.
    `,
    featuredImage: '/images/blog/react-18-concurrent.jpg',
    imageAlt: 'React 18 concurrent features diagram showing useTransition and Suspense',
    author,
    category: blogCategories.find(c => c.id === 'react')!,
    tags: [
      blogTags.find(t => t.id === 'react')!,
      blogTags.find(t => t.id === 'performance')!,
      blogTags.find(t => t.id === 'hooks')!,
      blogTags.find(t => t.id === 'tutorial')!
    ],
    publishedAt: '2025-01-15T08:00:00Z',
    updatedAt: '2025-01-16T10:30:00Z',
    readingTime: 8,
    views: 2547,
    likes: 89,
    comments: 23,
    featured: true,
    trending: true,
    status: 'published',
    seo: {
      metaTitle: 'React 18 Concurrent Features Guide - Better UX | Aaron A. Perez',
      metaDescription: 'Complete guide to React 18 concurrent features including Suspense, useTransition, and useDeferredValue. Improve your app\'s user experience with these powerful tools.',
      keywords: ['react 18', 'concurrent features', 'suspense', 'useTransition', 'user experience', 'performance'],
      canonicalUrl: 'https://aaronaperez.dev/blog/react-18-concurrent-features-better-ux',
      openGraph: {
        title: 'React 18 Concurrent Features Guide - Better UX',
        description: 'Learn React 18 concurrent features to create smoother user experiences',
        image: '/images/blog/react-18-concurrent-og.jpg',
        type: 'article'
      },
      twitter: {
        card: 'summary_large_image',
        title: 'React 18 Concurrent Features Guide',
        description: 'Master Suspense, useTransition, and useDeferredValue',
        image: '/images/blog/react-18-concurrent-twitter.jpg'
      }
    }
  },
  
  {
    id: 'typescript-advanced-patterns',
    title: 'Advanced TypeScript Patterns for Scalable Applications',
    slug: 'typescript-advanced-patterns-scalable-applications',
    excerpt: 'Explore advanced TypeScript patterns including conditional types, mapped types, and template literal types to build more robust and maintainable applications.',
    content: `
# Advanced TypeScript Patterns for Scalable Applications

As applications grow in complexity, leveraging TypeScript's advanced type system becomes crucial for maintaining code quality and developer productivity. Let's explore powerful patterns that will elevate your TypeScript skills.

## Conditional Types

Conditional types allow you to create types that depend on a condition:

\`\`\`typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };

// Usage
type StringResponse = ApiResponse<string>; // { message: string }
type DataResponse = ApiResponse<User>;     // { data: User }
\`\`\`

### Practical Example: Function Overloading

\`\`\`typescript
type DatabaseQuery<T extends 'single' | 'multiple'> = T extends 'single'
  ? User | null
  : User[];

function getUsers<T extends 'single' | 'multiple'>(
  type: T,
  id?: string
): DatabaseQuery<T> {
  if (type === 'single') {
    return findUserById(id!) as DatabaseQuery<T>;
  }
  return getAllUsers() as DatabaseQuery<T>;
}

// Type-safe usage
const singleUser = getUsers('single', '123'); // User | null
const multipleUsers = getUsers('multiple');   // User[]
\`\`\`

## Mapped Types

Transform existing types to create new ones:

\`\`\`typescript
// Make all properties optional and nullable
type PartialNullable<T> = {
  [P in keyof T]?: T[P] | null;
};

// Create update payload types
type UpdatePayload<T> = PartialNullable<Omit<T, 'id' | 'createdAt'>>;

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

type UserUpdate = UpdatePayload<User>;
// Result: { name?: string | null; email?: string | null; }
\`\`\`

## Template Literal Types

Build types from string patterns:

\`\`\`typescript
type EventName = 'click' | 'focus' | 'blur';
type ElementType = 'button' | 'input' | 'div';

type EventHandler<T extends EventName, E extends ElementType> = 
  \`on\${Capitalize<T>}\${Capitalize<E>}\`;

// Usage
type ButtonClickHandler = EventHandler<'click', 'button'>; 
// Result: "onClickButton"

// Dynamic event system
type EventMap = {
  [K in EventHandler<EventName, ElementType>]: (event: Event) => void;
};
\`\`\`

## Utility Type Composition

Combine multiple utility types for complex transformations:

\`\`\`typescript
// Create a type for form field configurations
type FormField<T> = {
  value: T;
  error?: string;
  touched: boolean;
  validate: (value: T) => string | null;
};

type FormState<T extends Record<string, any>> = {
  [K in keyof T]: FormField<T[K]>;
} & {
  isValid: boolean;
  isSubmitting: boolean;
  submit: () => Promise<void>;
};

// Usage
interface LoginForm {
  email: string;
  password: string;
}

type LoginFormState = FormState<LoginForm>;
\`\`\`

## Branded Types

Create distinct types from primitive types:

\`\`\`typescript
// Brand primitive types for type safety
type UserId = string & { readonly brand: unique symbol };
type Email = string & { readonly brand: unique symbol };
type Password = string & { readonly brand: unique symbol };

// Factory functions with validation
function createUserId(id: string): UserId {
  if (!id || id.length < 5) {
    throw new Error('Invalid user ID');
  }
  return id as UserId;
}

function createEmail(email: string): Email {
  if (!email.includes('@')) {
    throw new Error('Invalid email');
  }
  return email as Email;
}

// Type-safe function parameters
function sendWelcomeEmail(userId: UserId, email: Email): void {
  // Implementation
}

// Usage
const userId = createUserId('user123');
const email = createEmail('user@example.com');
sendWelcomeEmail(userId, email); // ✅ Type safe
// sendWelcomeEmail('invalid', 'invalid'); // ❌ Compile error
\`\`\`

## Recursive Types

Handle nested data structures:

\`\`\`typescript
type JSONValue = 
  | string
  | number
  | boolean
  | null
  | JSONObject
  | JSONArray;

interface JSONObject {
  [key: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

// Deep readonly type
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? DeepReadonly<T[P]>
    : T[P];
};
\`\`\`

## Performance Considerations

1. **Avoid deeply nested conditional types** - They can slow compilation
2. **Use type assertions sparingly** - Prefer type guards
3. **Leverage \`satisfies\` operator** - Better than type assertions
4. **Cache complex computed types** - Use type aliases

\`\`\`typescript
// Good: Use satisfies for better inference
const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
} satisfies Config;

// Better type inference than:
const config: Config = { /* ... */ };
\`\`\`

## Testing Advanced Types

Use \`@ts-expect-error\` for type testing:

\`\`\`typescript
// Type tests
type TestUser = { id: string; name: string; };
type TestUpdate = UpdatePayload<TestUser>;

// Should work
const validUpdate: TestUpdate = { name: 'John' };

// Should fail
// @ts-expect-error - id should not be updatable
const invalidUpdate: TestUpdate = { id: '123' };
\`\`\`

Advanced TypeScript patterns enable you to build more maintainable, scalable applications with better developer experience and fewer runtime errors. Start incorporating these patterns gradually, and you'll see significant improvements in code quality and team productivity.
    `,
    featuredImage: '/images/blog/typescript-patterns.jpg',
    imageAlt: 'TypeScript advanced patterns code examples on screen',
    author,
    category: blogCategories.find(c => c.id === 'react')!,
    tags: [
      blogTags.find(t => t.id === 'typescript')!,
      blogTags.find(t => t.id === 'best-practices')!,
      blogTags.find(t => t.id === 'code-quality')!,
      blogTags.find(t => t.id === 'guide')!
    ],
    publishedAt: '2025-01-08T09:00:00Z',
    readingTime: 12,
    views: 1834,
    likes: 67,
    comments: 15,
    featured: true,
    trending: false,
    status: 'published',
    seo: {
      metaTitle: 'Advanced TypeScript Patterns for Scalable Apps | Aaron A. Perez',
      metaDescription: 'Learn advanced TypeScript patterns like conditional types, mapped types, and template literals for building scalable applications.',
      keywords: ['typescript', 'advanced patterns', 'conditional types', 'mapped types', 'scalable applications'],
      canonicalUrl: 'https://aaronaperez.dev/blog/typescript-advanced-patterns-scalable-applications',
      openGraph: {
        title: 'Advanced TypeScript Patterns for Scalable Applications',
        description: 'Master conditional types, mapped types, and more',
        image: '/images/blog/typescript-patterns-og.jpg',
        type: 'article'
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Advanced TypeScript Patterns',
        description: 'Build scalable apps with advanced TypeScript',
        image: '/images/blog/typescript-patterns-twitter.jpg'
      }
    }
  },

  {
    id: 'core-web-vitals-optimization',
    title: 'Optimizing Core Web Vitals: A Complete Guide',
    slug: 'core-web-vitals-optimization-complete-guide',
    excerpt: 'Step-by-step guide to optimizing LCP, FID, and CLS for better search rankings and user experience. Includes real-world examples, tools, and measurement strategies.',
    content: `
# Optimizing Core Web Vitals: A Complete Guide

Core Web Vitals are essential metrics that measure real-world user experience. In this comprehensive guide, we'll explore how to optimize each metric for better performance and SEO rankings.

## Understanding Core Web Vitals

Google's Core Web Vitals consist of three key metrics:

- **LCP (Largest Contentful Paint)**: Loading performance
- **FID (First Input Delay)**: Interactivity 
- **CLS (Cumulative Layout Shift)**: Visual stability

### Performance Thresholds

- **Good**: LCP ≤ 2.5s, FID ≤ 100ms, CLS ≤ 0.1
- **Needs Improvement**: LCP 2.5-4s, FID 100-300ms, CLS 0.1-0.25
- **Poor**: LCP > 4s, FID > 300ms, CLS > 0.25

## Optimizing Largest Contentful Paint (LCP)

LCP measures when the largest content element becomes visible.

### Common LCP Elements
- Hero images
- Header text
- Video thumbnails
- Background images

### Optimization Strategies

#### 1. Optimize Images

\`\`\`jsx
// Use Next.js Image component with priority
import Image from 'next/image';

function Hero() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero image"
      width={1200}
      height={600}
      priority // Loads immediately
      sizes="(max-width: 768px) 100vw, 1200px"
    />
  );
}
\`\`\`

#### 2. Preload Critical Resources

\`\`\`html
<!-- Preload hero image -->
<link
  rel="preload"
  as="image"
  href="/hero-image.jpg"
  imageSizes="(max-width: 768px) 100vw, 1200px"
  imageSrcSet="/hero-image-sm.jpg 768w, /hero-image.jpg 1200w"
/>

<!-- Preload critical fonts -->
<link
  rel="preload"
  as="font"
  href="/fonts/inter-var.woff2"
  type="font/woff2"
  crossOrigin="anonymous"
/>
\`\`\`

#### 3. Optimize Server Response Times

\`\`\`typescript
// Implement caching strategies
export async function getStaticProps() {
  const data = await getCachedData();
  
  return {
    props: { data },
    revalidate: 3600, // ISR with 1-hour cache
  };
}

// Use CDN for static assets
const nextConfig = {
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/your-cloud/',
  },
};
\`\`\`

## Optimizing First Input Delay (FID)

FID measures the delay between user interaction and browser response.

### Optimization Techniques

#### 1. Code Splitting

\`\`\`typescript
// Lazy load non-critical components
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));
const Modal = lazy(() => import('./Modal'));

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />
      </Suspense>
    </div>
  );
}
\`\`\`

#### 2. Optimize JavaScript Execution

\`\`\`typescript
// Use Web Workers for heavy computations
const worker = new Worker('/workers/data-processor.js');

worker.postMessage({ data: largeDataset });
worker.onmessage = (event) => {
  const processedData = event.data;
  updateUI(processedData);
};

// Break up long tasks
function processLargeArray(array: any[]) {
  const chunkSize = 1000;
  let index = 0;

  function processChunk() {
    const chunk = array.slice(index, index + chunkSize);
    
    // Process chunk
    chunk.forEach(processItem);
    
    index += chunkSize;
    
    if (index < array.length) {
      // Yield to browser before next chunk
      setTimeout(processChunk, 0);
    }
  }
  
  processChunk();
}
\`\`\`


#### 3. Minimize Third-Party Scripts

\`\`\`typescript
// Load analytics with delay
useEffect(() => {
  const timer = setTimeout(() => {
    // Load non-critical analytics
    import('./analytics').then((analytics) => {
      analytics.initialize();
    });
  }, 2000);
  
  return () => clearTimeout(timer);
}, []);
\`\`\`

## Optimizing Cumulative Layout Shift (CLS)

CLS measures unexpected layout shifts during page load.

### Common Causes
- Images without dimensions
- Dynamically injected content
- Web fonts causing FOIT/FOUT
- Third-party widgets

### Prevention Strategies

#### 1. Reserve Space for Images

\`\`\`css
/* CSS aspect ratio for responsive images */
.image-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
\`\`\`

\`\`\`jsx
// React component with proper dimensions
function ResponsiveImage({ src, alt, aspectRatio = "16/9" }) {
  return (
    <div 
      className="relative overflow-hidden"
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
}
\`\`\`

#### 2. Optimize Font Loading

\`\`\`css
/* Use font-display: swap for web fonts */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter-var.woff2') format('woff2');
  font-display: swap;
  font-weight: 100 900;
}

/* Preload critical fonts */
<link
  rel="preload"
  as="font"
  href="/fonts/inter-var.woff2"
  type="font/woff2"
  crossOrigin="anonymous"
/>
\`\`\`

#### 3. Handle Dynamic Content

\`\`\`jsx
// Reserve space for dynamic content
function NewsletterSignup() {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="min-h-[120px]"> {/* Reserve space */}
      {isVisible ? (
        <form className="space-y-4">
          <input placeholder="Email" />
          <button>Subscribe</button>
        </form>
      ) : (
        <button onClick={() => setIsVisible(true)}>
          Show Newsletter Signup
        </button>
      )}
    </div>
  );
}
\`\`\`

## Measurement and Monitoring

### Field Data vs Lab Data

\`\`\`typescript
// Real User Monitoring (RUM)
function measureWebVitals() {
  import('web-vitals').then(({ getCLS, getFID, getLCP }) => {
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getLCP(sendToAnalytics);
  });
}

function sendToAnalytics(metric: any) {
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.value),
    non_interaction: true,
  });
}
\`\`\`

### Continuous Monitoring

\`\`\`typescript
// Lighthouse CI configuration
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
      },
    },
    assert: {
      assertions: {
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-input-delay': ['error', { maxNumericValue: 100 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
      },
    },
  },
};
\`\`\`

## Tools and Resources

1. **Chrome DevTools**: Performance panel and Lighthouse
2. **PageSpeed Insights**: Google's official tool
3. **Web Vitals Extension**: Real-time metrics
4. **Core Web Vitals Report**: Search Console data
5. **Lighthouse CI**: Automated performance testing

Optimizing Core Web Vitals requires a comprehensive approach covering performance, user experience, and technical implementation. By following these strategies and continuously monitoring your metrics, you can achieve excellent performance scores and improve both user experience and search rankings.
    `,
    featuredImage: '/images/blog/core-web-vitals.jpg',
    imageAlt: 'Core Web Vitals dashboard showing LCP, FID, and CLS metrics',
    author,
    category: blogCategories.find(c => c.id === 'performance')!,
    tags: [
      blogTags.find(t => t.id === 'core-web-vitals')!,
      blogTags.find(t => t.id === 'performance')!,
      blogTags.find(t => t.id === 'optimization')!,
      blogTags.find(t => t.id === 'guide')!
    ],
    publishedAt: '2025-01-02T10:00:00Z',
    readingTime: 15,
    views: 3201,
    likes: 125,
    comments: 31,
    featured: true,
    trending: true,
    status: 'published',
    seo: {
      metaTitle: 'Core Web Vitals Optimization Guide - LCP, FID, CLS | Aaron A. Perez',
      metaDescription: 'Complete guide to optimizing Core Web Vitals including LCP, FID, and CLS. Improve SEO rankings and user experience with proven strategies.',
      keywords: ['core web vitals', 'lcp optimization', 'fid improvement', 'cls fix', 'web performance', 'seo'],
      canonicalUrl: 'https://aaronaperez.dev/blog/core-web-vitals-optimization-complete-guide',
      openGraph: {
        title: 'Core Web Vitals Optimization Guide - LCP, FID, CLS',
        description: 'Master Core Web Vitals optimization for better SEO and UX',
        image: '/images/blog/core-web-vitals-og.jpg',
        type: 'article'
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Core Web Vitals Optimization Guide',
        description: 'Optimize LCP, FID, and CLS for better performance',
        image: '/images/blog/core-web-vitals-twitter.jpg'
      }
    }
  }
];

// Update category and tag counts
blogCategories.forEach(category => {
  if (category.id === 'all') {
    category.count = blogPosts.length;
  } else {
    category.count = blogPosts.filter(post => post.category.id === category.id).length;
  }
});

blogTags.forEach(tag => {
  tag.count = blogPosts.reduce((count, post) => {
    return count + (post.tags.some(postTag => postTag.id === tag.id) ? 1 : 0);
  }, 0);
});

import { cn } from "@/lib/utils";

// Skip to content component for accessibility
export const SkipToContent = () => (
  <a
    href="#main-content"
    className={cn(
      "sr-only focus:not-sr-only",
      "fixed top-4 left-4 z-[100]",
      "px-4 py-2 bg-gray-900",
      "border border-gray-700",
      "rounded-md shadow-sm",
      "focus:outline-none focus:ring-2 focus:ring-blue-500"
    )}
  >
    Skip to content
  </a>
);
import { cn } from "@/lib/utils";

// Skip to content component for accessibility
export const SkipToContent = () => (
  <a
    href="#main-content"
    className={cn(
      "sr-only",
      "fixed top-4 left-4 z-[100]",
      "px-4 py-2 bg-gray-900",
      "border border-gray-700",
      "rounded-md shadow-sm"
    )}
  >
    Skip to content
  </a>
);
/**
 * TechStackInput Component
 *
 * A tag input component for managing tech stack items.
 * Features auto-suggestions from common technologies.
 */

'use client';

import { useState, useCallback, useRef, useEffect, memo } from 'react';

// Common tech stack suggestions
const TECH_SUGGESTIONS = [
  'Next.js',
  'React',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'Node.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'MySQL',
  'Prisma',
  'Drizzle',
  'GraphQL',
  'REST API',
  'Docker',
  'AWS',
  'Vercel',
  'Git',
  'GitHub',
  'CI/CD',
  'Jest',
  'Playwright',
  'Cypress',
  'Framer Motion',
  'Zustand',
  'Redux',
  'SWR',
  'React Query',
  'Zod',
  'Socket.io',
  'Stripe',
  'Firebase',
  'Supabase',
  'Cloudinary',
  'Mapbox',
  'C#',
  '.NET',
  'Python',
  'Django',
  'Flask',
  'Vue.js',
  'Angular',
  'Svelte',
  'HTML',
  'CSS',
  'SASS',
  'Responsive Design',
  'SEO Optimization',
  'Performance Optimization',
  'Web Accessibility',
  'WCAG',
];

interface TechStackInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

/**
 * TechStackInput - Tag input for managing technologies
 *
 * Features:
 * - Add tags by typing and pressing Enter or comma
 * - Remove tags by clicking X or pressing backspace
 * - Auto-complete suggestions from common technologies
 * - Duplicate prevention
 */
const TechStackInput = memo(function TechStackInput({
  value,
  onChange,
  placeholder = 'Add technology...',
  maxTags = 15,
}: TechStackInputProps) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter suggestions based on input and exclude already selected
  const filteredSuggestions = TECH_SUGGESTIONS.filter(
    (tech) =>
      tech.toLowerCase().includes(input.toLowerCase()) &&
      !value.includes(tech)
  ).slice(0, 8);

  // Handle clicking outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Add a new tag
   */
  const addTag = useCallback(
    (tag: string) => {
      const trimmedTag = tag.trim();
      if (!trimmedTag) return;
      if (value.includes(trimmedTag)) return; // Prevent duplicates
      if (value.length >= maxTags) return; // Enforce max tags

      onChange([...value, trimmedTag]);
      setInput('');
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
    },
    [value, onChange, maxTags]
  );

  /**
   * Remove a tag by index
   */
  const removeTag = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange]
  );

  /**
   * Handle keyboard navigation and input
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Add tag on Enter or comma
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (selectedSuggestion >= 0 && filteredSuggestions[selectedSuggestion]) {
        addTag(filteredSuggestions[selectedSuggestion]);
      } else if (input.trim()) {
        addTag(input);
      }
      return;
    }

    // Remove last tag on Backspace when input is empty
    if (e.key === 'Backspace' && !input && value.length > 0) {
      removeTag(value.length - 1);
      return;
    }

    // Navigate suggestions with arrow keys
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestion((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestion((prev) => (prev > 0 ? prev - 1 : -1));
      return;
    }

    // Close suggestions on Escape
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
    }
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    // Check for comma-separated values
    if (newValue.includes(',')) {
      const tags = newValue.split(',');
      tags.forEach((tag) => addTag(tag));
      return;
    }
    setInput(newValue);
    setShowSuggestions(newValue.length > 0);
    setSelectedSuggestion(-1);
  };

  /**
   * Select a suggestion
   */
  const handleSelectSuggestion = (suggestion: string) => {
    addTag(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tech Stack
      </label>

      {/* Tags container */}
      <div
        className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg bg-white min-h-[44px] focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Existing tags */}
        {value.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className="inline-flex items-center gap-1 px-2 py-1 bg-cyan-100 text-cyan-800 rounded-md text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="hover:bg-cyan-200 rounded-full p-0.5 transition-colors"
              aria-label={`Remove ${tag}`}
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </span>
        ))}

        {/* Input field */}
        {value.length < maxTags && (
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => input && setShowSuggestions(true)}
            placeholder={value.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] outline-none text-sm bg-transparent"
          />
        )}
      </div>

      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSelectSuggestion(suggestion)}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors ${
                index === selectedSuggestion ? 'bg-cyan-50 text-cyan-700' : ''
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Helper text */}
      <p className="mt-1 text-xs text-gray-500">
        Press Enter or comma to add. {value.length}/{maxTags} technologies.
      </p>
    </div>
  );
});

export default TechStackInput;

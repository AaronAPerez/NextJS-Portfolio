/**
 * ProjectLogo Component
 *
 * Renders a project's brand mark on a card. Most client projects have a real
 * logo file; the rest fall back to a monogram tinted with the project's accent
 * colour so every card gets a consistent brand anchor instead of an empty slot.
 */

'use client';

import { memo } from 'react';
import Image from 'next/image';

// Words that carry no identity and would make a poor monogram ("The Glamping
// Spot" should read "GS", not "TG").
const IGNORED_WORDS = new Set(['the', 'a', 'an', 'of', 'and']);

const SIZES = {
  sm: { box: 'h-9 w-9', text: 'text-[11px]', px: 36 },
  md: { box: 'h-12 w-12', text: 'text-sm', px: 48 },
  lg: { box: 'h-16 w-16', text: 'text-lg', px: 64 },
} as const;

export type ProjectLogoSize = keyof typeof SIZES;

interface ProjectLogoProps {
  /** Project title — used for the alt text and the monogram fallback */
  title: string;
  /** Path to a logo image, when the project has one */
  logo?: string;
  /** Project accent colour, used to tint the monogram fallback */
  accentColor: string;
  size?: ProjectLogoSize;
  className?: string;
}

/** Derive up to two initials from a project title. */
export function monogramFor(title: string): string {
  const words = title
    .split(/[\s.\-_/]+/)
    .filter(Boolean)
    .filter((w) => !IGNORED_WORDS.has(w.toLowerCase()));

  const source = words.length > 0 ? words : [title];
  return source
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

function ProjectLogo({
  title,
  logo,
  accentColor,
  size = 'md',
  className = '',
}: ProjectLogoProps) {
  const { box, text, px } = SIZES[size];

  // Shared shell so the image and monogram variants occupy identical space.
  const shell = `flex ${box} flex-shrink-0 items-center justify-center overflow-hidden ${className}`;

  if (logo) {
    return (
      <div className={shell}>
        <Image
          src={logo}
          alt={`${title} logo`}
          width={px}
          height={px}
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`${shell} rounded-xl border font-semibold tracking-wide ${text}`}
      style={{
        backgroundColor: `${accentColor}1A`,
        borderColor: `${accentColor}40`,
        color: accentColor,
      }}
      role="img"
      aria-label={`${title} monogram`}
    >
      {monogramFor(title)}
    </div>
  );
}

export default memo(ProjectLogo);

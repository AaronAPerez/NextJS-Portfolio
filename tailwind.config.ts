// tailwind.config.ts
// Extends Tailwind v3 defaults. Do NOT override base scales —
// only extend with portfolio-specific tokens.

import type { Config } from 'tailwindcss';

const config: Config = {
  // ── Dark mode — class-based so ThemeProvider / next-themes controls it ──
  darkMode: 'class',

  // ── Content paths — tell Tailwind where to scan for class usage ──
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      // ── Brand colors (map to CSS variables for runtime theming) ──
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand)',
          hover:   'var(--color-brand-hover)',
          light:   'var(--color-brand-light)',
          muted:   'var(--color-brand-muted)',
          dark:    'var(--color-brand-dark)',
        },
        // Portfolio surface scale (mirrors CSS variables)
        surface: {
          DEFAULT:  'var(--color-bg)',
          subtle:   'var(--color-bg-subtle)',
          muted:    'var(--color-bg-muted)',
          emphasis: 'var(--color-bg-emphasis)',
        },
        // Content text scale
        content: {
          DEFAULT:   'var(--color-text)',
          secondary: 'var(--color-text-secondary)',
          tertiary:  'var(--color-text-tertiary)',
          inverse:   'var(--color-text-inverse)',
        },
        // Border scale
        stroke: {
          DEFAULT: 'var(--color-border)',
          hover:   'var(--color-border-hover)',
          strong:  'var(--color-border-strong)',
          brand:   'var(--color-border-brand)',
        },
      },

      // ── Font families ──
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Cascadia Code', 'Fira Code', 'monospace'],
      },

      // ── Font sizes with tight line-heights for headings ──
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
      },

      // ── Letter spacing ──
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.02em',
        tight:    '-0.01em',
        widest:   '0.08em',
      },

      // ── Border radius — maps to --radius-* tokens ──
      borderRadius: {
        '4xl': '2rem',
      },

      // ── Max widths ──
      maxWidth: {
        prose: '65ch',
        '8xl':  '88rem',
      },

      // ── Box shadows — subtle, non-distracting ──
      boxShadow: {
        'sm-brand': '0 1px 3px 0 rgb(37 99 235 / 0.15)',
        'card':     '0 1px 3px 0 rgb(0 0 0 / 0.04), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card-hover': '0 4px 12px 0 rgb(0 0 0 / 0.08), 0 1px 3px 0 rgb(0 0 0 / 0.04)',
        'focus':    '0 0 0 3px rgb(37 99 235 / 0.25)',
      },

      // ── Spacing additions ──
      spacing: {
        '4.5': '1.125rem',
        '13':  '3.25rem',
        '15':  '3.75rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
        '88':  '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      // ── Height additions ──
      height: {
        'screen-dvh': '100dvh',
      },

      // ── Min-height ──
      minHeight: {
        'screen-dvh': '100dvh',
      },

      // ── Z-index ──
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      // ── Transition timing ──
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      // ── Transition durations ──
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
        '600': '600ms',
      },

      // ── Backdrop blur ──
      backdropBlur: {
        xs: '2px',
      },

      // ── Keyframe animations ──
      keyframes: {
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'available-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      // ── Animation utilities ──
      animation: {
        'fade-in':         'fade-in 0.5s ease-out forwards',
        'slide-up':        'slide-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slide-in-right':  'slide-in-right 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'available-pulse': 'available-pulse 2.5s ease-in-out infinite',
        'shimmer':         'shimmer 2s linear infinite',
      },

      // ── Background images ──
      backgroundImage: {
        // Diagonal clip — hero section accent
        'none': 'none',
        // Grid pattern (used in hero overlay)
        'grid-pattern': `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
        // Shimmer skeleton loading
        'shimmer-gradient': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)',
      },

      // ── Background size ──
      backgroundSize: {
        'grid':    '40px 40px',
        '200%':    '200%',
      },

      // ── Clip paths ──
      // Used for the hero diagonal block — applied via arbitrary value [clip-path:...]
      // or via a custom CSS variable. Not natively in Tailwind, use the CSS utility class
      // .diagonal-block in globals.css or `[clip-path:polygon(...)]` inline.

      // ── Screens — keep Tailwind defaults, add only what's missing ──
      screens: {
        'xs': '480px',
        // sm: 640px (default)
        // md: 768px (default)
        // lg: 1024px (default)
        // xl: 1280px (default)
        // 2xl: 1536px (default)
        '3xl': '1920px',
      },

      // ── Line clamp ──
      lineClamp: {
        7:  '7',
        8:  '8',
        9:  '9',
        10: '10',
      },

      // ── Prose (typography plugin) ──
      typography: (theme: (arg: string) => string) => ({
        DEFAULT: {
          css: {
            color:          theme('colors.gray.600'),
            maxWidth:       '65ch',
            lineHeight:     '1.75',
            '--tw-prose-body':        theme('colors.gray.600'),
            '--tw-prose-headings':    theme('colors.gray.900'),
            '--tw-prose-links':       theme('colors.blue.600'),
            '--tw-prose-bold':        theme('colors.gray.900'),
            '--tw-prose-code':        theme('colors.gray.900'),
            '--tw-prose-pre-bg':      theme('colors.gray.100'),
            '--tw-prose-counters':    theme('colors.gray.500'),
            '--tw-prose-bullets':     theme('colors.gray.300'),
            '--tw-prose-quotes':      theme('colors.gray.900'),
            '--tw-prose-quote-borders': theme('colors.blue.300'),
            h1: { fontWeight: '600', letterSpacing: '-0.02em' },
            h2: { fontWeight: '600', letterSpacing: '-0.02em' },
            h3: { fontWeight: '600', letterSpacing: '-0.01em' },
            a: {
              fontWeight:     '500',
              textDecoration: 'underline',
              textDecorationColor: theme('colors.blue.300'),
              textUnderlineOffset: '3px',
              '&:hover': { textDecorationColor: theme('colors.blue.500') },
            },
            code: {
              backgroundColor: theme('colors.gray.100'),
              padding:         '0.1em 0.35em',
              borderRadius:    '0.25rem',
              fontSize:        '0.875em',
              fontWeight:      '400',
            },
            'code::before': { content: '""' },
            'code::after':  { content: '""' },
          },
        },
        invert: {
          css: {
            '--tw-prose-body':        theme('colors.gray.300'),
            '--tw-prose-headings':    theme('colors.white'),
            '--tw-prose-links':       theme('colors.blue.400'),
            '--tw-prose-bold':        theme('colors.white'),
            '--tw-prose-code':        theme('colors.gray.200'),
            '--tw-prose-pre-bg':      'rgb(17 24 39)',
            '--tw-prose-counters':    theme('colors.gray.400'),
            '--tw-prose-bullets':     theme('colors.gray.600'),
            '--tw-prose-quotes':      theme('colors.gray.100'),
            '--tw-prose-quote-borders': theme('colors.blue.600'),
          },
        },
      }),
    },
  },

  plugins: [
    // @tailwindcss/typography — for prose content if you add a blog/case studies
    require('@tailwindcss/typography'),

    // @tailwindcss/forms — normalizes form elements (used in ContactSection)
    require('@tailwindcss/forms')({
      strategy: 'class', // only apply to elements with .form-* classes
    }),

    // @tailwindcss/line-clamp — built-in to Tailwind v3.3+, safe to include
    // require('@tailwindcss/line-clamp'),

    // Custom plugin: clip-path utilities for the hero diagonal
    ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) => {
      addUtilities({
        '.clip-diagonal': {
          'clip-path': 'polygon(28% 0, 100% 0, 100% 100%, 0% 100%)',
        },
        '.clip-diagonal-sm': {
          'clip-path': 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
        },
        '.clip-diagonal-lg': {
          'clip-path': 'polygon(40% 0, 100% 0, 100% 100%, 0% 100%)',
        },
      });
    },
  ],
};

export default config;
// tailwind.admin.config.ts
// Separate Tailwind build for app/admin and app/tools (internal, non-public
// tooling). Reuses the public theme/plugins so shared UI primitives (Button,
// Card, etc.) render identically, but scans only admin/tools files so its
// utility classes never ship to the public site — see app/admin-tools.css.

import type { Config } from 'tailwindcss';
import baseConfig from './tailwind.config';

const config: Config = {
  ...baseConfig,
  content: [
    './app/admin/**/*.{js,ts,jsx,tsx,mdx}',
    './app/tools/**/*.{js,ts,jsx,tsx,mdx}',
    './components/admin/**/*.{js,ts,jsx,tsx,mdx}',
    './components/ui/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;

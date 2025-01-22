import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const svgToDataUri = require("mini-svg-data-uri");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config = {
	darkMode: ["class"],
	content: [
	  "./pages/**/*.{ts,tsx}",
	  "./components/**/*.{ts,tsx}",
	  "./app/**/*.{ts,tsx}",
	  "./src/**/*.{ts,tsx}",
	  "./data/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
	  container: {
		center: true,
		padding: "2rem",
		screens: {
		  "xs": "375px",
		  "sm": "640px",
		  "md": "768px", 
		  "lg": "1024px",
		  "xl": "1280px",
		  "2xl": "1400px"
		}
	  },
	  extend: {
		fontFamily: {
		  sans: ["var(--font-geist-sans)", ...fontFamily.sans],
		},
		colors: {
		  // Brand colors
		  primary: {
			DEFAULT: "var(--primary)",
			foreground: "var(--primary-foreground)",
			'50': '#f0f9ff',
			'100': '#e0f2fe',
			'200': '#bae6fd',
			'300': '#7dd3fc',
			'400': '#38bdf8',
			'500': '#0ea5e9',
			'600': '#0284c7',
			'700': '#0369a1',
			'800': '#075985',
			'900': '#0c4a6e',
			'950': '#082f49',
		  },
		  secondary: {
			DEFAULT: "var(--secondary)",
			foreground: "var(--secondary-foreground)",
		  },
		  destructive: {
			DEFAULT: "var(--destructive)",
			foreground: "var(--destructive-foreground)",
		  },
		  muted: {
			DEFAULT: "var(--muted)",
			foreground: "var(--muted-foreground)",
		  },
		  accent: {
			DEFAULT: "var(--accent)",
			foreground: "var(--accent-foreground)",
		  },
		  // Interface colors
		  background: "var(--background)",
		  foreground: "var(--foreground)",
		  card: {
			DEFAULT: "var(--card)",
			foreground: "var(--card-foreground)",
		  },
		  popover: {
			DEFAULT: "var(--popover)",
			foreground: "var(--popover-foreground)",
		  },
		  border: "var(--border)",
		  input: "var(--input)",
		  ring: "var(--ring)",
		  // Custom colors
		  black: {
			'100': '#000319',
			'200': 'rgba(17, 25, 40, 0.75)',
			'300': 'rgba(255, 255, 255, 0.125)',
			DEFAULT: '#000000'
		  },
		  white: {
			'100': '#BEC1DD',
			'200': '#C1C2D3',
			DEFAULT: '#FFFFFF'
		  },
		  chart: {
			'1': 'var(--chart-1)',
			'2': 'var(--chart-2)',
			'3': 'var(--chart-3)',
			'4': 'var(--chart-4)',
			'5': 'var(--chart-5)'
		  }
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		keyframes: {
		  "accordion-down": {
			from: { height: "0" },
			to: { height: "var(--radix-accordion-content-height)" },
		  },
		  "accordion-up": {
			from: { height: "var(--radix-accordion-content-height)" },
			to: { height: "0" },
		  },
		  spotlight: {
			"0%": {
			  opacity: "0",
			  transform: "translate(-72%, -62%) scale(0.5)",
			},
			"100%": {
			  opacity: "1",
			  transform: "translate(-50%,-40%) scale(1)",
			},
		  },
		  shimmer: {
			from: { backgroundPosition: "0 0" },
			to: { backgroundPosition: "-200% 0" },
		  },
		  moveHorizontal: {
			"0%": {
			  transform: "translateX(-50%) translateY(-10%)",
			},
			"50%": {
			  transform: "translateX(50%) translateY(10%)",
			},
			"100%": {
			  transform: "translateX(-50%) translateY(-10%)",
			},
		  },
		  moveInCircle: {
			"0%": { transform: "rotate(0deg)" },
			"50%": { transform: "rotate(180deg)" },
			"100%": { transform: "rotate(360deg)" },
		  },
		  moveVertical: {
			"0%": { transform: "translateY(-50%)" },
			"50%": { transform: "translateY(50%)" },
			"100%": { transform: "translateY(-50%)" },
		  },
		  scroll: {
			to: { transform: "translate(calc(-50% - 0.5rem))" },
		  },
		  meteor: {
			"0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
			"70%": { opacity: "1" },
			"100%": {
			  transform: "rotate(215deg) translateX(-500px)",
			  opacity: "0",
			},
		  },
		  spin: {
			"0%": { transform: "rotate(0deg)" },
			"100%": { transform: "rotate(360deg)" },
		  },
		},
		animation: {
		  "accordion-down": "accordion-down 0.2s ease-out",
		  "accordion-up": "accordion-up 0.2s ease-out",
		  spotlight: "spotlight 2s ease .75s 1 forwards",
		  shimmer: "shimmer 2s linear infinite",
		  "meteor-effect": "meteor 5s linear infinite",
		  first: "moveVertical 30s ease infinite",
		  second: "moveInCircle 20s reverse infinite",
		  third: "moveInCircle 40s linear infinite",
		  fourth: "moveHorizontal 40s ease infinite",
		  fifth: "moveInCircle 20s ease infinite",
		  scroll: "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
		  "spin-slow": "spin 4s linear infinite",
		},
		spacing: {
		  'safe-top': 'env(safe-area-inset-top)',
		  'safe-bottom': 'env(safe-area-inset-bottom)',
		  'safe-left': 'env(safe-area-inset-left)',
		  'safe-right': 'env(safe-area-inset-right)',
		},
		zIndex: {
		  '-1': '-1',
		  '1': '1',
		  '2': '2',
		  '3': '3',
		  '4': '4',
		  '5': '5',
		},
	  },
	},
	plugins: [
	  require("tailwindcss-animate"),
	  addVariablesForColors,
	  // Background patterns plugin
	  function ({ matchUtilities, theme }: any) {
		matchUtilities(
		  {
			"bg-grid": (value: any) => ({
			  backgroundImage: `url("${svgToDataUri(
				`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100" height="100" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
			  )}")`,
			}),
			"bg-grid-small": (value: any) => ({
			  backgroundImage: `url("${svgToDataUri(
				`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
			  )}")`,
			}),
			"bg-dot": (value: any) => ({
			  backgroundImage: `url("${svgToDataUri(
				`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
			  )}")`,
			}),
		  },
		  { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
		);
	  },
	],
  };


// Helper function to generate CSS variables for colors
function addVariablesForColors({ addBase, theme }: any) {
  const colors = flattenColorPalette(theme("colors"));
  const variables = Object.fromEntries(
    Object.entries(colors).map(([key, val]) => [`--${key}`, val])
  );
  
  addBase({
    ":root": variables,
  });
}

export default config;
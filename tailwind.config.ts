import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				'30': '#004785',
  				'40': '#005FAE',
  				'50': '#0078D9',
  				'60': '#2592FF',
  				'70': '#71ADFF',
  				'80': '#A5C8FF',
  				'90': '#D4E3FF',
  				'95': '#EBF1FF',
  				'98': '#F9F9FF',
  				'100': '#FFFFFF',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'dodger-blue': {
  				'50': '#eef8ff',
  				'100': '#d9efff',
  				'200': '#bce3ff',
  				'300': '#8ed3ff',
  				'400': '#59b8ff',
  				'500': '#2592ff',
  				'600': '#1b79f5',
  				'700': '#1463e1',
  				'800': '#174fb6',
  				'900': '#19458f',
  				'950': '#142b57'
  			},
  			lavender: {
  				'50': '#faf5ff',
  				'100': '#f3e7ff',
  				'200': '#e8d4ff',
  				'300': '#d7b2ff',
  				'400': '#b46eff',
  				'500': '#a551fb',
  				'600': '#902eef',
  				'700': '#7b1ed2',
  				'800': '#691eab',
  				'900': '#56198a',
  				'950': '#390566'
  			},
  			saffron: {
  				'50': '#fefbec',
  				'100': '#fcf3c9',
  				'200': '#f9e68e',
  				'300': '#f6d353',
  				'400': '#f4bf2a',
  				'500': '#eda013',
  				'600': '#d27a0d',
  				'700': '#ae570f',
  				'800': '#8e4312',
  				'900': '#753812',
  				'950': '#431c05'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			'thick-black': '3px 3px 0px 2px rgba(0,0,0,1)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;

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
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
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
  			},
			  rose: {
				50: '#FFE6F0', 100: '#FFCCE0', 200: '#FF99C2', 300: '#FF66A3', 
				400: '#FF3385', 500: '#FF0066', 600: '#CC0052', 700: '#99003D', 
				800: '#660029', 900: '#330014',
			  },
			  purple: {
				50: '#F3E8FF', 100: '#E6D0FF', 200: '#CCA1FF', 300: '#B372FF', 
				400: '#9952FF', 500: '#7F00FF', 600: '#6600CC', 700: '#4C0099', 
				800: '#330066', 900: '#1A0033',
			  },
			  'blue-gray': {
				50: '#E5E5EB', 100: '#CCCCD6', 200: '#9999AD', 300: '#666685', 
				400: '#4D4D6A', 500: '#33334D', 600: '#26263A', 700: '#1A1A27', 
				800: '#0D0D13', 900: '#000000',
			  },
			  mint: {
				50: '#E6FFFA', 100: '#CCFFF5', 200: '#99FFEB', 300: '#66FFE0', 
				400: '#33FFD6', 500: '#00FFCC', 600: '#00CC99', 700: '#009973', 
				800: '#00664D', 900: '#003326',
			  },
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [],
};
export default config;

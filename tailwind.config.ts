/**
 * Tailwind CSS Configuration
 *
 * Brand colors synced from lib/constants/colors.ts (SSOT).
 *
 * @see {@link /docs/design-system/colors.md} for complete color documentation
 */
import { COLORS } from './lib/constants/colors';

const { brand } = COLORS;

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Trustfin Design System — synced from lib/constants/colors.ts
        brand: {
          primary: brand.primary,
          50: brand[50],
          100: brand[100],
          200: brand[200],
          300: brand[300],
          400: brand[400],
          500: brand[500],
          600: brand[600],
          700: brand[700],
          800: brand[800],
          900: brand[900],
          light: {
            from: brand.lightGradient.from,
            to: brand.lightGradient.to,
          },
          lightest: {
            from: brand.lightestGradient.from,
            to: brand.lightestGradient.to,
          },
        },
        gray: {
          900: COLORS.gray[900],
          700: COLORS.gray[700],
          500: COLORS.gray[500],
          100: COLORS.gray[100],
        },

        // Legacy trustfin.blue — same values as brand scale
        wc: {
          blue: {
            heading: brand[600],
            50: brand[50],
            100: brand[100],
            200: brand[200],
            300: brand[300],
            400: brand[400],
            500: brand[500],
            600: brand[600],
            700: brand[700],
            800: brand[800],
            900: brand[900],
          },
          dark: brand[900],
          accent: brand[400],
          green: '#22C55E',
        },

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
        '3xl': 'calc(var(--radius) + 12px)',
        '4xl': 'calc(var(--radius) + 16px)',
      },

      fontFamily: {
        sans: ['var(--font-satoshi)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        satoshi: ['var(--font-satoshi)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },

      backgroundImage: {
        'brand-light': `linear-gradient(135deg, ${brand.lightGradient.from} 0%, ${brand.lightGradient.to} 100%)`,
        'brand-lightest': `linear-gradient(135deg, ${brand.lightestGradient.from} 0%, ${brand.lightestGradient.to} 100%)`,
        'hero-gradient': `linear-gradient(180deg, ${brand[500]} 0%, ${brand[300]} 35%, ${brand[200]} 55%, ${brand[100]} 70%, ${brand[50]} 85%, #FFFFFF 100%)`,
      },

      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },

      animation: {
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
      },

      zIndex: {
        '100': '100',
        '10000': '10000',
      },
    },
  },
  plugins: [],
};

export default config;

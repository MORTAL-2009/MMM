/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Stitch Atelier Nuptials Tokens
        background: "#F7F2E8",
        "surface-canvas": "#F4EFE6",
        parchment: "#FAF6EF",
        "parchment-low": "#F0E9DC",
        "parchment-deep": "#E7DFCE",
        secondary: "#9C7A3C",
        "gold-accent": "#C5A059",
        "gold-light": "#E9DAC0",
        "gold-pale": "#F4EDE0",
        "on-surface": "#1A1E1C",
        "on-surface-variant": "#4E5752",
        outline: "#857D71",
        "outline-variant": "rgba(197, 160, 89, 0.3)",
        error: "#9B2C2C",

        // Primary color with Stitch deep & container variants + legacy numeric scale
        primary: {
          DEFAULT: "#0D221A",
          deep: "#081611",
          container: "#173428",
          50: 'var(--color-primary-50, #FFFDF0)',
          100: 'var(--color-primary-100, #FDF9D9)',
          200: 'var(--color-primary-200, #F9EFB0)',
          300: 'var(--color-primary-300, #F5E282)',
          400: 'var(--color-primary-400, #E5C158)',
          500: 'var(--color-primary-500, #D4AF37)',
          600: 'var(--color-primary-600, #B89225)',
          700: 'var(--color-primary-700, #8C6D15)',
          800: 'var(--color-primary-800, #5C4609)',
          900: 'var(--color-primary-900, #332604)',
        },
        surface: {
          base: 'var(--color-bg-base)',
          card: 'var(--color-bg-card)',
          muted: 'var(--color-bg-muted)',
          border: 'var(--color-border)',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F3E5AB',
          dark: '#AA7C11',
          accent: '#E5C158',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'Cinzel', 'serif'],
        'headline-xl': ['Playfair Display', 'serif'],
        'headline-lg': ['Playfair Display', 'serif'],
        'headline-md': ['Playfair Display', 'serif'],
        'headline-sm': ['Playfair Display', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        'body-lg': ['Plus Jakarta Sans', 'sans-serif'],
        'body-md': ['Plus Jakarta Sans', 'sans-serif'],
        'body-sm': ['Plus Jakarta Sans', 'sans-serif'],
        'label-lg': ['Plus Jakarta Sans', 'sans-serif'],
        'label-caps': ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px -3px var(--color-primary-glow, rgba(212, 175, 55, 0.15))',
        'gold-glow': '0 0 20px -3px rgba(212, 175, 55, 0.3)',
        'stitch-card': '0 24px 60px -15px rgba(13, 34, 26, 0.15)',
        'stitch-hover': '0 16px 45px rgba(13, 34, 26, 0.25)',
      },
    },
  },
  plugins: [],
};

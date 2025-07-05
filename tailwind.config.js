/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': {
          DEFAULT: '#FF6D00', // orange-600
          50: '#FFF3E0', // orange-50
          100: '#FFE0B2', // orange-100
          200: '#FFCC80', // orange-200
          300: '#FFB74D', // orange-300
          400: '#FFA726', // orange-400
          500: '#FF9800', // orange-500
          600: '#FF6D00', // orange-600
          700: '#F57C00', // orange-700
          800: '#EF6C00', // orange-800
          900: '#E65100', // orange-900
          foreground: '#FFFFFF', // white
        },
        // Secondary Colors
        'secondary': {
          DEFAULT: '#FFF3E0', // orange-50
          foreground: '#1F2937', // gray-800
        },
        // Accent Colors
        'accent': {
          DEFAULT: '#FF9800', // orange-500
          foreground: '#FFFFFF', // white
        },
        // Background Colors
        'background': '#FAFAFA', // gray-50
        'surface': {
          DEFAULT: '#FFFFFF', // white
          foreground: '#1F2937', // gray-800
        },
        // Text Colors
        'text': {
          primary: '#1F2937', // gray-800
          secondary: '#6B7280', // gray-500
          muted: '#9CA3AF', // gray-400
        },
        // Status Colors
        'success': {
          DEFAULT: '#10B981', // emerald-500
          foreground: '#FFFFFF', // white
        },
        'warning': {
          DEFAULT: '#F59E0B', // amber-500
          foreground: '#FFFFFF', // white
        },
        'error': {
          DEFAULT: '#EF4444', // red-500
          foreground: '#FFFFFF', // white
        },
        'info': {
          DEFAULT: '#3B82F6', // blue-500
          foreground: '#FFFFFF', // white
        },
        // Border Colors
        'border': {
          DEFAULT: '#E5E7EB', // gray-200
          muted: '#F3F4F6', // gray-100
        },
      },
      fontFamily: {
        'heading': ['Cairo', 'system-ui', 'sans-serif'],
        'body': ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        'caption': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0px 1px 3px rgba(0, 0, 0, 0.1)',
        'md': '0px 4px 12px rgba(0, 0, 0, 0.15)',
        'lg': '0px 10px 25px rgba(0, 0, 0, 0.2)',
        'elevation-1': '0px 1px 3px rgba(0, 0, 0, 0.1)',
        'elevation-2': '0px 4px 12px rgba(0, 0, 0, 0.15)',
        'elevation-3': '0px 10px 25px rgba(0, 0, 0, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 200ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'scale-in': 'scaleIn 150ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        'bounce-subtle': 'bounceSubtle 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSubtle: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
      },
      zIndex: {
        '1': '1',
        '10': '10',
        '50': '50',
        '100': '100',
        '200': '200',
        '300': '300',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}
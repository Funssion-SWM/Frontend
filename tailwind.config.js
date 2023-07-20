/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        default: ['var(--font-default)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        white: 'var(--novel-white)',
        stone: {
          50: 'var(--novel-stone-50)',
          100: 'var(--novel-stone-100)',
          200: 'var(--novel-stone-200)',
          300: 'var(--novel-stone-300)',
          400: 'var(--novel-stone-400)',
          500: 'var(--novel-stone-500)',
          600: 'var(--novel-stone-600)',
          700: 'var(--novel-stone-700)',
          800: 'var(--novel-stone-800)',
          900: 'var(--novel-stone-900)',
        },
      },
      minHeight: {
        'screen(-header)': 'calc(100vh - 70px)',
      },
    },
  },
  plugins: [
    // Tailwind plugins
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};

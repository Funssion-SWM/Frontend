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
        memo: {
          green: 'var(--memo-bgcolor-green)',
          yellow: 'var(--memo-bgcolor-yellow)',
          navy: 'var(--memo-bgcolor-navy)',
          purple: 'var(--memo-bgcolor-purple)',
          pink: 'var(--memo-bgcolor-pink)',
          skyblue: 'var(--memo-bgcolor-skyblue)',
          orange: 'var(--memo-bgcolor-orange)',
        },
        soma: {
          black: 'var(--soma-black)',
          white: 'var(--soma-white)',
          red: {
            20: 'var(--soma-red-20 )',
            60: 'var(--soma-red-60 )',
          },
          blue: {
            5: 'var(--soma-blue-5)',
            10: 'var(--soma-blue-10)',
            20: 'var(--soma-blue-20)',
            30: 'var(--soma-blue-30)',
            35: 'var(--soma-blue-35)',
            40: 'var(--soma-blue-40)',
            50: 'var(--soma-blue-50)',
            60: 'var(--soma-blue-60)',
          },
          grey: {
            5: 'var(--soma-grey-5)',
            10: 'var(--soma-grey-10)',
            20: 'var(--soma-grey-20)',
            25: 'var(--soma-grey-25)',
            30: 'var(--soma-grey-30)',
            40: 'var(--soma-grey-40)',
            45: 'var(--soma-grey-45)',
            48: 'var(--soma-grey-48)',
            49: 'var(--soma-grey-49)',
            50: 'var(--soma-grey-50)',
            60: 'var(--soma-grey-60)',
            70: 'var(--soma-grey-70)',
            80: 'var(--soma-grey-80)',
          },
          green: 'var(--soma-green)',
        },
      },
      minHeight: {
        'for-fit-screen': 'calc(100vh - 120px)',
      },
      maxHeight: {
        'for-fit-screen': 'calc(100vh - 120px)',
      },
    },
  },
  plugins: [
    // Tailwind plugins
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};

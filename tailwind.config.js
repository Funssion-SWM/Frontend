/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        '19/20': '95%',
      },
      height: {
        '19/20': '95%',
      },
      scale: {
        102: '1.02',
      },
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
        rank: {
          bronze: 'var(--rank-bronze)',
          silver: 'var(--rank-silver)',
          gold: 'var(--rank-gold)',
          platinum: 'var(--rank-platinum)',
          diamond: 'var(--rank-diamond)',
          infinity: 'var(--rank-infinity)',
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
          codeblock: 'var(--soma-codeblock)',
        },
      },
      minHeight: {
        'for-fit-screen': 'calc(100vh - 120px)',
        'screen-150px': 'calc(100vh - 150px)',
      },
      maxHeight: {
        'for-fit-screen': 'calc(100vh - 120px)',
      },
      fontSize: {
        '6xl': [
          '3.5rem',
          {
            lineHeight: '3.75rem',
            letterSpacing: '-0.02em',
            fontWeight: '700',
          },
        ],
      },
      keyframes: {
        fall: {
          '0%': { opacity: 0 },
          '3%, 90%': { opacity: 0.9 },
          '100%': {
            transform: 'translateY(97%)',
            opacity: 0,
          },
        },
      },
      animation: {
        fall: 'fall 3.5s linear infinite',
      },
    },
  },
  plugins: [
    // Tailwind plugins
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
};

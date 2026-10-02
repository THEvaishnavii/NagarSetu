import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: {
          DEFAULT: '#173f30',
          hover: '#2a6b4f',
        },
        // Structural Colors
        background: '#e6ede2',
        card: '#f4f7f1',
        border: '#E5E5E0',
        // Typography Colors
        text: {
          primary: '#1A1A1A',
          secondary: '#6B6B6B',
        },
        // Status Badge Colors (mapping to Tailwind's standard accessible shades)
        status: {
          reported: colors.gray[500],
          acknowledged: colors.amber[500],
          inProgress: colors.blue[500],
          resolved: colors.green[600],
        },
        // Category Tag/Pin Colors
        category: {
          pothole: colors.red[500],
          garbage: colors.yellow[500],
          water: colors.blue[500],
          streetlight: colors.green[500],
          other: colors.purple[500],
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Clean sans-serif
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}

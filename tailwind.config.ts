import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        fuchsia:    '#E91E8C',
        coral:      '#FF6B9D',
        peach:      '#FFB347',
        'brand-black': '#1A1A2E',
        purple:     '#2D1B4E',
        'soft-pink':'#FDF0F5',
        'brand-gray':'#4A4A6A',
        nude:       '#F5E6D3',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        sans:     ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #E91E8C 0%, #FF6B9D 50%, #FFB347 100%)',
        'dark-gradient':  'linear-gradient(135deg, #1A1A2E 0%, #2D1B4E 100%)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    // './pages/**/*.{js,ts,jsx,tsx,mdx}',
    // './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'regal-blue': '#111823',
        'regal-blue-dark': '#111823',
        'regal-blue-normal': '#1F2533',
        'regal-blue-light': '#2D3446',
        'bg-regal-blue': '#111823',
        'brand-primary': '#E93D44'
      },
    },
  },
  plugins: [],
}

export default config

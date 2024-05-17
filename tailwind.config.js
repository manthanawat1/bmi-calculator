/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#5403ce',
        'grey': '#f1f1f1',
        'dark-grey': '#c7c7c7',
      },
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'prompt': ['Prompt', 'ui-sans-serif'],
    }
  },
  plugins: [],
}


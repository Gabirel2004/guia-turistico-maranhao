/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./componentes/**/*.{js,ts,jsx,tsx,mdx}", // Adicionei a sua pasta 'componentes'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
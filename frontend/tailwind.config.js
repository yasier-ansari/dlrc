/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx, html}'],
	theme: {
		extend: {
			fontFamily: {
				outfit: ['Outfit', 'sans-serif'],
				victor: ['Victor Mono', 'sans-serif'],
				barlow: ['Barlow', 'sans-serif'],
				paytone: ['Paytone One', 'sans-serif']
			}
		}
	},
	plugins: []
}

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./views/*.hbs'],
	theme: {
		extend: {
			colors: {
				'wild-sand': {
					50: '#f3f4f6',
					100: '#edeef1',
					200: '#d7dbe0',
					300: '#b3bbc6',
					400: '#8a96a6',
					500: '#6c798b',
					600: '#566173',
					700: '#474f5d',
					800: '#3d444f',
					900: '#363b44',
					950: '#24272d',
				},
			},
		},
	},
	variants: {},
	plugins: [{ tailwindcss: {}, autoprefixer: {} }],
};

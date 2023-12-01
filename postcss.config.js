import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import nesting from 'postcss-nesting';

const config = {
	plugins: [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		nesting(),
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		autoprefixer()
	]
};

export default config;

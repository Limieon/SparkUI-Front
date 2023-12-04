import { sveltekit } from '@sveltejs/kit/vite';
import postcss from 'postcss';
import { defineConfig } from 'vite';
import postcssNesting from 'postcss-nesting';

import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default defineConfig({
	plugins: [sveltekit()]
});

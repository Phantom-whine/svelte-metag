// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    vite: {
      build: {
        rollupOptions: {
          external: ['js-cookie', 'axios'] // 👈 Add this line
        }
      }
    }
  },
  preprocess: vitePreprocess()
};

export default config;
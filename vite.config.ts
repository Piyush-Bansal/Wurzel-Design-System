import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
                @use './src/scss/abstract/token' as *;
                @use './src/scss/abstract/mixin-breakpoints' as *;
                @use './src/scss/abstract/functions' as *;
                
            `
			}
		}
	}
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the same build works on GitHub Pages (served from /rooted-arabic/)
// and as a Claude Artifact (served from the artifact's own root).
export default defineConfig({
  plugins: [react()],
  base: './',
  // The lazy-loaded audio clip bundle is ~2.6 MB by design; don't warn about it.
  build: { chunkSizeWarningLimit: 3000 },
});

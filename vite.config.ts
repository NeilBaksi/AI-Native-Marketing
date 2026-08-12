import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'

export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm], providerImportSource: '@mdx-js/react' }) },
    react(),
  ],
  base: '/AI-Native-Marketing/',
  server: { port: 5481, strictPort: true },
  preview: { port: 5481, strictPort: true },
})

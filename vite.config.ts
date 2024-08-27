import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@codemirror/state']
  },
  plugins: [
    nodePolyfills({
      include: ['fs', 'module', 'os', 'path', 'stream', 'util'],
      overrides: {
        module: path.resolve(__dirname, 'module.override.js'),
        fs: 'memfs'
      },
      globals: {
        process: true
      },
      protocolImports: true
    }),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      eslint: 'eslint-linter-browserify',
      '@codemirror/state': path.resolve(
        __dirname,
        './node_modules/@codemirror/state/dist/index.cjs'
      )
    }
  }
})

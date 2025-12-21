import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const prerender = require('vite-plugin-prerender')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  base: process.env.BASE_URL || '/',
  plugins: [
    react(),
    prerender({
      staticDir: path.resolve(__dirname, 'dist'),
      routes: ['/', '/about', '/services', '/testimonials', '/contact', '/book']
    })
  ]
})
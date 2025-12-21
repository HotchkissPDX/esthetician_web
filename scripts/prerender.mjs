import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectRoot = path.resolve(__dirname, '..')
const clientDist = path.join(projectRoot, 'dist')
const ssrDist = path.join(projectRoot, 'dist-ssr')

// Vite's SSR build will emit an entry named after the input file (ssr.js)
const ssrEntry = path.join(ssrDist, 'ssr.js')

const templatePath = path.join(clientDist, 'index.html')
if (!fs.existsSync(templatePath)) {
  console.error('Template not found at', templatePath)
  process.exit(1)
}

const templateHtml = fs.readFileSync(templatePath, 'utf-8')

// Routes to prerender
const routes = ['/', '/about', '/services', '/testimonials', '/contact', '/book']

// Dynamically import the SSR renderer
const { render } = await import(pathToFileURL(ssrEntry).href)

for (const route of routes) {
  // For the home page, the app redirects to /about. Render /about but write to /index.html.
  const renderUrl = route === '/' ? '/about' : route
  const { appHtml, head } = render(renderUrl)

  let html = templateHtml
  // Inject head tags just before closing head
  if (head && head.trim()) {
    html = html.replace('</head>', `${head}\n</head>`)
  }
  // Inject the app HTML into the root div
  html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`) 

  // Determine output path
  const outDir = route === '/' ? clientDist : path.join(clientDist, route)
  const outPath = route === '/' ? path.join(outDir, 'index.html') : path.join(outDir, 'index.html')

  // Ensure directory exists
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(outPath, html, 'utf-8')
  console.log('Prerendered', route, '->', path.relative(projectRoot, outPath))
}

console.log('Prerender complete.')

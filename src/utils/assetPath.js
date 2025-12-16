// Utility to resolve assets from the public folder across environments
// - Accepts values like "headshot.jpeg", "/headshot.jpeg", or "/public/headshot.jpeg"
// - Returns a URL prefixed with Vite's base (import.meta.env.BASE_URL), ensuring it works under a subpath
export function publicUrl(path) {
  if (!path) return path
  // Remove protocol or full URLs
  if (/^https?:\/\//i.test(path)) return path
  // Normalize: strip any leading "/public" and leading slashes
  let p = String(path).replace(/^\/?public\/?/i, '')
  p = p.replace(/^\//, '')
  const base = import.meta.env.BASE_URL || '/'
  // Ensure exactly one slash between base and path
  return (base.endsWith('/') ? base : base + '/') + p
}

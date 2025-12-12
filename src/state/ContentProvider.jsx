import { createContext, useContext, useMemo } from 'react'

// Load all JSON files from the /content directory at build time (eager)
// Vite will bundle these as static JSON.
const modules = import.meta.glob('/content/*.json', { eager: true, import: 'default' })

// Normalize to a simple key => data map where key is the filename without extension
const contentData = Object.entries(modules).reduce((acc, [path, data]) => {
  const parts = path.split('/')
  const file = parts[parts.length - 1]
  const name = file.replace(/\.json$/i, '')
  acc[name] = data
  return acc
}, {})

const ContentContext = createContext({ content: {}, loading: false, error: null })

export function ContentProvider({ children }) {
  const value = useMemo(() => ({ content: contentData, loading: false, error: null }), [])
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return ctx
}

export default ContentContext

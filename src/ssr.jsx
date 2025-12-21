import React from 'react'
import { renderToString } from 'react-dom/server'
// In React Router v7, StaticRouter is provided by the core package
// Importing from 'react-router-dom/server' or 'react-router/dom/server' may fail
// with missing export specifiers depending on subpath exports. Use core package.
import { StaticRouter } from 'react-router'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { HelmetProvider } from 'react-helmet-async'

import App from './App.jsx'
import theme from './theme.js'
import { ContentProvider } from './state/ContentProvider.jsx'

export function render(url) {
  const helmetContext = {}

  const app = (
    <HelmetProvider context={helmetContext}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StaticRouter location={url}>
          <ContentProvider>
            <App />
          </ContentProvider>
        </StaticRouter>
      </ThemeProvider>
    </HelmetProvider>
  )

  const appHtml = renderToString(app)
  const { helmet } = helmetContext

  const head = [
    helmet?.title?.toString?.() || '',
    helmet?.meta?.toString?.() || '',
    helmet?.link?.toString?.() || ''
  ].join('\n')

  return { appHtml, head }
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'
import App from './App.jsx'
import theme from './theme.js'
import { ContentProvider } from './state/ContentProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'

const helmetContext = {}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider context={helmetContext}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <ContentProvider>
            <App />
          </ContentProvider>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>,
)

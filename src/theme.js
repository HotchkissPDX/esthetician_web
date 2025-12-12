import { createTheme, responsiveFontSizes } from '@mui/material/styles'

// Light, soothing palette with Sage green as the primary color
// Reference tones chosen for good contrast and accessibility
let theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: '#CFE3D3', // pale sage tint
      main: '#8AAE92', // sage green
      dark: '#4F6F52', // deep sage
      contrastText: '#0D1B12',
    },
    secondary: {
      light: '#F6EDE9', // soft blush
      main: '#E7D8CF',
      dark: '#B8A79F',
      contrastText: '#2E2A28',
    },
    background: {
      default: '#F9FAF8', // very light neutral with a warm tint
      paper: '#FFFFFF',
    },
    text: {
      primary: '#253228',
      secondary: '#516157',
    },
    divider: '#E6ECE7',
  },
  typography: {
    fontFamily: '"Roboto", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
})

// Enable responsive font sizes across breakpoints
theme = responsiveFontSizes(theme)

export default theme

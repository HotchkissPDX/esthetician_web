import { NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default function Navigation() {
  const linkStyle = ({ isActive }) => ({
    fontWeight: isActive ? 600 : 400,
    backgroundColor: isActive ? 'rgba(207, 227, 211, 0.6)' : 'transparent', // primary.light with transparency
  })

  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        backdropFilter: 'saturate(180%) blur(6px)',
        backgroundColor: (theme) => `${theme.palette.background.paper}cc`,
      }}
   >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <Box component="nav" aria-label="Primary" sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap' }}>
            <Button component={NavLink} to="/about" color="inherit" style={linkStyle} sx={{ borderRadius: 2 }}>
              About
            </Button>
            <Button component={NavLink} to="/services" color="inherit" style={linkStyle} sx={{ borderRadius: 2 }}>
              Services
            </Button>
            <Button component={NavLink} to="/testimonials" color="inherit" style={linkStyle} sx={{ borderRadius: 2 }}>
              Testimonials
            </Button>
            <Button component={NavLink} to="/contact" color="inherit" style={linkStyle} sx={{ borderRadius: 2 }}>
              Contact
            </Button>
            <Button component={NavLink} to="/book" color="inherit" style={linkStyle} sx={{ borderRadius: 2 }}>
              Book
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

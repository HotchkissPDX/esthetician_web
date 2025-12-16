import React from 'react'
import { NavLink } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import useMediaQuery from '@mui/material/useMediaQuery'
import MenuIcon from '@mui/icons-material/Menu'
import { publicUrl } from '../utils/assetPath.js'

export default function Navigation() {
  // Collapse navigation at or below 450px width
  const isNarrow = useMediaQuery('(max-width:450px)')

  const [anchorEl, setAnchorEl] = React.useState(null)
  const menuOpen = Boolean(anchorEl)
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)
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
        <Toolbar disableGutters sx={{ gap: 1, justifyContent: 'flex-start' }}>
          {isNarrow ? (
            <>
              <IconButton
                aria-label="open navigation menu"
                color="inherit"
                onClick={handleMenuOpen}
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                keepMounted
              >
                <MenuItem component={NavLink} to="/about" onClick={handleMenuClose} style={linkStyle} sx={{ borderRadius: 1 }}>
                  About
                </MenuItem>
                <MenuItem component={NavLink} to="/services" onClick={handleMenuClose} style={linkStyle} sx={{ borderRadius: 1 }}>
                  Services
                </MenuItem>
                <MenuItem component={NavLink} to="/testimonials" onClick={handleMenuClose} style={linkStyle} sx={{ borderRadius: 1 }}>
                  Testimonials
                </MenuItem>
                <MenuItem component={NavLink} to="/contact" onClick={handleMenuClose} style={linkStyle} sx={{ borderRadius: 1 }}>
                  Contact
                </MenuItem>
                <MenuItem component={NavLink} to="/book" onClick={handleMenuClose} style={linkStyle} sx={{ borderRadius: 1 }}>
                  Book
                </MenuItem>
              </Menu>
            </>
          ) : (
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
          )}
          {/* Spacer to push the site icon to the far right */}
          <Box sx={{ flexGrow: 1 }} />
          {/* Site icon linking to About page (right side) */}
          <IconButton
            component={NavLink}
            to="/about"
            aria-label="Go to About page"
            color="inherit"
            size="large"
            sx={{ p: 0.5 }}
          >
            <Box
              component="img"
              src={publicUrl('sage.png')}
              alt="Site icon"
              sx={{ width: 28, height: 28, display: 'block', borderRadius: 1 }}
            />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LinkIcon from '@mui/icons-material/Link'
import { useContent } from '../state/ContentProvider.jsx'

export default function Footer() {
  const { content } = useContent()
  const footer = content?.footer || {}

  const contact = footer.contact
  const availability = footer.availability
  const address = footer.address
  const social = footer.social

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.light',
        py: 4,
        mt: 6,
        width: '100%', // ensure full-width like the AppBar
        textAlign: 'center', // center-align all footer content
        padding: '1rem',
        // Responsive font sizing for footer typography
        '& .MuiTypography-h6': {
          typography: { xs: 'subtitle1', sm: 'h6' },
        },
        '& .MuiTypography-body2': {
          fontSize: { xs: '0.9rem', sm: '1rem' },
        },
        '& .MuiTypography-caption': {
          fontSize: { xs: '0.75rem', sm: '0.8125rem' },
        },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Contact
            </Typography>
              <Typography variant="body2" color="text.secondary">{contact.email}</Typography>
              <Typography variant="body2" color="text.secondary">{contact.phone}</Typography>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Hours
            </Typography>
            {availability.map((line, idx) => (
              <Typography key={idx} variant="body2" color="text.secondary">{line}</Typography>
            ))}
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Address
            </Typography>
              <Typography variant="body2" color="text.secondary">{address.street}</Typography>
              <Typography variant="body2" color="text.secondary">{address.city + ', ' + address.state + ' ' + address.zip}</Typography>
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom color="text.primary">
              Follow
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
              <Link href={social.instagram} target="_blank" rel="noopener noreferrer" color="inherit" aria-label="Instagram" underline="hover" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                <InstagramIcon fontSize="small" />
                <Typography variant="body2">Instagram</Typography>
              </Link>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ mt: 1 }}>
              <Link href={social.linkedin} target="_blank" rel="noopener noreferrer" color="inherit" aria-label="LinkedIn" underline="hover" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                <LinkedInIcon fontSize="small" />
                <Typography variant="body2">LinkedIn</Typography>
              </Link>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, marginTop: '1rem', marginBottom: '1rem' }} />
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} {contact.first_name + ' ' + contact.last_name}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

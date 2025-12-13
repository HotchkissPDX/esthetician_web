import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useContent } from '../state/ContentProvider.jsx'

export default function About() {
  const { content } = useContent()

  const contact = content.footer.contact
  const about = content.about

  const image = about.image
  const introduction = toParagraphs(about.introduction)
  const extended = toParagraphs(about.extended)

  function toParagraphs(str) {
    return str.split(/\n\n|\r\n\r\n|\n|\r/g).filter(Boolean)
  }

  // Ensure images from the public folder resolve correctly (e.g., "headshot.jpeg" -> "/headshot.jpeg")
  function resolveImageSrc(src) {
    if (!src) return src
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) return src
    return `/${src}`
  }

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 6 } }}>
      <Grid
        container
        spacing={4}
        direction={{ xs: 'column', sm: 'row' }}
        wrap="nowrap"
        sx={{
          // Vertically center intro with the image on side-by-side layouts
          alignItems: { xs: 'stretch', sm: 'center' },
        }}
      >
        {/* Left: description (cap max width at sm+ so the photo doesn't get too small) */}
        <Grid
          item
          xs={12}
          sm={7}
          sx={{
            minWidth: 0,
            // At small screens and up, cap the intro column width so the image retains space
            maxWidth: { xs: 'none', sm: 720 },
            // Override Grid's sm flex-basis so the cap can take effect and let the image grow
            flexBasis: { xs: 'auto', sm: 'auto' },
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            { contact.first_name + ' ' + contact.last_name }
          </Typography>
          {/* Blush divider separating header from introduction */}
          <Box
            sx={{
              height: 4,
              width: { xs: '40%', sm: '30%' },
              bgcolor: '#F4C2C2', // blush tone
              borderRadius: 1,
              mb: 2,
              mt: -0.5,
              mx: 'auto', // center horizontally under the header
            }}
          />
          {
            introduction.map((p, idx) => (
              <Typography key={idx} variant="body1" color="text.secondary">
                {p}
              </Typography>
            ))
          }
        </Grid>

        {/* Right: image */}
        <Grid
          item
          xs={12}
          sm={5}
          sx={{
            // Allow the image column to take the remaining space when intro hits its max width
            flexGrow: { xs: 0, sm: 1 },
            flexBasis: { xs: 'auto', sm: 0 },
            minWidth: { xs: 0, sm: 280 },
          }}
        >
          {image ? (
            <Box
              component="img"
              src={resolveImageSrc(image)}
              alt="Esthetician portrait"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                display: 'block',
                objectFit: 'cover',
              }}
            />
          ) : null}
        </Grid>
      </Grid>
      {/* Full-width extended description below the image + introduction */}
      {extended && extended.length > 0 ? (
        <Box sx={{ mt: { xs: 3, md: 5 } }}>
          {extended.map((p, idx) => (
            <Typography key={`ext-${idx}`} variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
              {p}
            </Typography>
          ))}
        </Box>
      ) : null}
    </Box>
  )
}

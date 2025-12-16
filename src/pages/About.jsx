import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useContent } from '../state/ContentProvider.jsx'
import BlushDivider from '../components/BlushDivider.jsx'
import { publicUrl } from '../utils/assetPath.js'

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

  // Resolve images from the public folder using Vite's base
  function resolveImageSrc(src) {
    return publicUrl(src)
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
          <BlushDivider />
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
                // Rounded blush border to match the divider styling
                border: '4px solid #F4C2C2',
                borderRadius: 2,
                display: 'block',
                objectFit: 'cover',
              }}
            />
          ) : null}
        </Grid>
      </Grid>
      {/* Extended description with jade roller framing on the left */}
      {extended && extended.length > 0 ? (
        <Box sx={{ mt: { xs: 3, md: 5 } }}>
          <Grid container spacing={2} alignItems="flex-start" wrap="nowrap" direction="row">
            {/* Decorative jade roller in blush as a vertical frame */}
            <Grid item xs="auto" sx={{ alignSelf: 'flex-start' }}>
              <Box
                aria-hidden
                sx={{
                  width: { xs: 100, sm: 120 },
                  height: { xs: 100, sm: 120 },
                  mx: 0,
                  mb: 0,
                  backgroundColor: '#F4C2C2', // blush tone
                  WebkitMaskImage: `url(${publicUrl('jade-roller.png')})`,
                  maskImage: `url(${publicUrl('jade-roller.png')})`,
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  // Tall aspect ratio to mimic a vertical framing element
                  aspectRatio: '1 / 3',
                  display: 'block',
                }}
              />
            </Grid>
            {/* Extended text */}
            <Grid
              item
              xs
              sx={{
                alignSelf: 'flex-start',
                minWidth: 0,
                // Add padding-left so the text doesn't visually collide with the jade roller
                pl: 10,
                pt: 2
              }}
            >
              {extended.map((p, idx) => (
                <Typography key={`ext-${idx}`} variant="body1" color="text.secondary" sx={{ mb: 1.5 }}>
                  {p}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Box>
      ) : null}
    </Box>
  )
}

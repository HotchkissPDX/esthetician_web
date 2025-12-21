import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useContent } from '../state/ContentProvider.jsx'
import BlushDivider from "../components/BlushDivider.jsx";
import { Helmet } from 'react-helmet-async'

export default function Book() {
  const { content } = useContent()
  const book = content.book
  const description = book.generic_text
  const url = book.external_url

  const site = 'https://madelyn-hotchkiss.com'
  const pageUrl = `${site}/book`
  const title = 'Book a Service | Madelyn Hotchkiss Esthetics'
  const desc = 'Schedule your facial in Portland, OR with Madelyn Hotchkiss Esthetics. Personalized, soothing skincare for radiant results. Book online in minutes.'
  const ogImage = `${site}/headshot.jpeg`

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 6 } }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Book
        </Typography>
        <BlushDivider sx={{ width: { xs: '12%', sm: '8%' }}}/>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Button
          component="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          sx={{
            // Slightly larger button size
            px: { xs: 2.5, sm: 3 }, // horizontal padding (theme spacing units)
            py: { xs: 1, sm: 1.25 }, // vertical padding
            fontSize: { xs: '0.95rem', sm: '1rem' },
            bgcolor: 'primary.light',
            color: 'primary.contrastText',
            fontWeight: 500,
            boxShadow: 'none',
            transition: (theme) =>
              theme.transitions.create(
                ['box-shadow', 'transform', 'background-color', 'font-weight'],
                { duration: theme.transitions.duration.short }
              ),
            '&:hover': {
              fontWeight: 700, // embolden text on hover
              boxShadow: 4, // add hover shadow
            },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.dark',
              outlineOffset: '2px',
            },
          }}
        >
          Book Now!
        </Button>
      </Box>
    </>
  )
}

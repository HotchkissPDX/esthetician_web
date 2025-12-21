import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Rating from '@mui/material/Rating'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import BlushDivider from '../components/BlushDivider.jsx'
import { useContent } from '../state/ContentProvider.jsx'
import { Helmet } from 'react-helmet-async'

export default function Testimonials() {
  const { content } = useContent()

  const testimonials_data = content.testimonials

  const testimonials = testimonials_data.testimonials || []
  const description = testimonials_data.generic_text || "Hear from my customers"
  const services = content.services.services || []
  const serviceById = new Map(services.map((s) => [s.id, s]))

  const site = 'https://madelyn-hotchkiss.com'
  const pageUrl = `${site}/testimonials`
  const title = 'Portland Skincare Testimonials | Madelyn Hotchkiss Esthetics'
  const desc = 'Read what happy customers have to say about Madelyn Hotchkiss Esthetics in Portland, OR. See why locals love our personalized services, and book your spot today.'
  const ogImage = `${site}/headshot.jpeg`

  function formatDate(iso) {
    if (!iso) return ''
    // If the string is in bare YYYY-MM-DD format, construct a local date to
    // avoid timezone shifting (new Date('YYYY-MM-DD') is parsed as UTC).
    const opts = { year: 'numeric', month: 'long', day: 'numeric' }
    if (/^\d{4}-\d{2}-\d{2}$/.test(iso)) {
      const [y, m, d] = iso.split('-').map(Number)
      const localDate = new Date(y, m - 1, d)
      if (!Number.isNaN(localDate.getTime())) {
        return localDate.toLocaleDateString(undefined, opts)
      }
      return iso
    }
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return iso
    return d.toLocaleDateString(undefined, opts)
  }

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
          Testimonials
        </Typography>
        <BlushDivider sx={{ width: { xs: '30%', sm: '15%' } }}/>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {description}
        </Typography>

        {/* Horizontally scrollable carousel showing 3 cards at a time on desktop */}
        <Box
          role="list"
          aria-label="Client testimonials"
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            pb: 1,
            // hide default scrollbar on WebKit while keeping accessibility
            '::-webkit-scrollbar': { height: 8 },
            '::-webkit-scrollbar-thumb': { backgroundColor: '#d1d1d1', borderRadius: 8 },
          }}
        >
          {testimonials.map((t, idx) => {
            const service = serviceById.get(t.service_id)
            const serviceName = service ? service.name : 'Service'
            return (
              <Card
                role="listitem"
                key={idx}
                variant="outlined"
                sx={{
                  scrollSnapAlign: 'start',
                  flex: '0 0 85%', // default mobile ~1 card
                  minWidth: 260,
                  // Add blush border for a bit more color
                  border: '2px solid #F4C2C2',
                  borderRadius: 2,
                  overflow: 'hidden',
                  '@media (min-width:600px)': { flexBasis: '48%' }, // ~2 cards on small screens
                  '@media (min-width:900px)': { flexBasis: '31%' }, // ~3 cards on md+
                }}
              >
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                    <Rating
                      value={t.rating ?? 0}
                      readOnly
                      precision={0.5}
                      size="small"
                      sx={{
                        '& .MuiRating-iconFilled': { color: '#F4C2C2' },
                        '& .MuiRating-iconHover': { color: '#F4C2C2' },
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {t.rating}/5
                    </Typography>
                  </Stack>

                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {t.customer_name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(t.date)}
                  </Typography>

                  <Box sx={{ mt: 1, mb: 1 }}>
                    <Chip label={serviceName} variant="outlined" size="small" />
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    {t.testimony}
                  </Typography>
                </CardContent>
              </Card>
            )
          })}
        </Box>
      </Box>
    </>
  )
}

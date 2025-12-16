import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import BlushDivider from '../components/BlushDivider.jsx'
import { useContent } from '../state/ContentProvider.jsx'

export default function Services() {
  const { content } = useContent()
  const servicesData = content.services || {}
  const description = servicesData.generic_text || 'Explore facial treatments, skincare services, and more.'
  const url = servicesData.external_url
  const services = servicesData.services || []

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 6 } }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Services
      </Typography>
      <BlushDivider sx={{ width: { xs: '24%', sm: '12%' } }} />
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>

      {/* Responsive grid of service cards */}
      <Box
        role="list"
        aria-label="Available services"
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            xs: '1fr',          // 1 per row on mobile
            sm: 'repeat(2, 1fr)', // 2 per row on small screens
            md: 'repeat(3, 1fr)', // 3 per row on md+
          },
          mb: 3,
        }}
      >
        {services.map((s) => (
          <Card
            role="listitem"
            key={s.id}
            variant="outlined"
            sx={{
              border: '2px solid #F4C2C2',
              borderRadius: 2,
              overflow: 'hidden',
              height: '100%',
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {s.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {s.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {url && (
        <Button
          component="a"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          sx={{
            px: { xs: 2.5, sm: 3 },
            py: { xs: 1, sm: 1.25 },
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
              fontWeight: 700,
              boxShadow: 4,
            },
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.dark',
              outlineOffset: '2px',
            },
          }}
        >
          View Full Services & Pricing
        </Button>
      )}
    </Box>
  )
}

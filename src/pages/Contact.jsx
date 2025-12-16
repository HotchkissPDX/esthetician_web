import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { useContent } from '../state/ContentProvider.jsx'
import BlushDivider from '../components/BlushDivider.jsx'

export default function Contact() {
  const { content } = useContent()
  const contact = content.contact || {}
  const { form_url: formUrl, generic_text: genericText } = contact

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 6 } }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Contact
      </Typography>
      <BlushDivider sx={{ width: { xs: '20%', sm: '10%' }}}/>
      {genericText ? (
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {genericText}
        </Typography>
      ) : null}

      {formUrl ? (
        <Box
          component="iframe"
          title="Contact form"
          src={formUrl}
          sx={{
            width: '100%',
            border: 0,
            // Provide a reasonable min height; Google Forms will auto-size within
            minHeight: { xs: 900, sm: 1000 },
            borderRadius: 1,
            backgroundColor: 'background.paper',
          }}
        />
      ) : (
        <Typography variant="body2" color="text.secondary">
          The contact form is currently unavailable. You can reach out directly via{' '}
          <Link href="#" underline="hover">email</Link>.
        </Typography>
      )}
    </Box>
  )
}

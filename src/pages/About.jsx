import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useContent } from '../state/ContentProvider.jsx'

export default function About() {
  const { content } = useContent()
  const contact = content.footer.contact

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        { contact.first_name + ' ' + contact.last_name }
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome to our esthetician studio. Learn more about our philosophy and experience.
      </Typography>
    </Box>
  )
}

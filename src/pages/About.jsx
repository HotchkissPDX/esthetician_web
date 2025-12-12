import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function About() {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        About
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome to our esthetician studio. Learn more about our philosophy and experience.
      </Typography>
    </Box>
  )
}

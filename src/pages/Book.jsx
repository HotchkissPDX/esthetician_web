import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export default function Book() {
  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom>
        Book
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Ready to glow? Book your appointment now.
      </Typography>
    </Box>
  )
}

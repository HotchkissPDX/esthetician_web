import Box from '@mui/material/Box'

/**
 * BlushDivider
 * A simple, reusable blush-colored divider bar used under headings.
 *
 * Props:
 * - sx: MUI sx overrides to customize styling.
 */
export default function BlushDivider({ sx }) {
  return (
    <Box
      aria-hidden
      sx={{
        height: 4,
        width: { xs: '40%', sm: '30%' },
        bgcolor: '#F4C2C2',
        borderRadius: 1,
        mb: 2,
        mt: -0.5,
        mx: 'auto',
        ...sx,
      }}
    />
  )
}

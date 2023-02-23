import { Box } from '@mui/material';

export default function CellControlBox({ children, hidden }) {
  if (hidden) return null;
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '5px',
        margin: '0 auto 8px',
        justifyContent: 'flex-end',
      }}
    >
      {children}
    </Box>
  );
}

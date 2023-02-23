import { Button } from '@mui/material';

export default function ControlButton({handleClick, children, ...props}) {
  return (
    <Button
      onClick={handleClick}
      sx={{
        minWidth: 'unset',
        padding: '2px 2px',
        color: 'white',
      }}
      size="small"
      variant='contained'
      disableElevation
      {...props}
    >
      {children}
    </Button>
  );
}

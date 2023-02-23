import IconButton from '@mui/material/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

export default function EditButton({ handleClick, hidden, ...props }) {
  if (hidden) return null;
  return (
    <IconButton
      onClick={handleClick}
      className="edit-button"
      sx={{
        position: 'absolute',
        top: '3%',
        right: '3%',
        zIndex: 10,
        transform: 'scale(0)',
        transition: 'transform .2s',
        pointerEvents: 'none',
      }}
      size="small"
      color="primary"
      {...props}
    >
      <EditRoundedIcon fontSize="small" />
    </IconButton>
  );
}

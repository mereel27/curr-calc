import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/material';

export const StyledTableContainer = styled(TableContainer)(() => ({
  maxWidth: '800px',
  width: '100%',
  margin: '50px auto 0',
  overflow: 'hidden',
}));

export const StyledTable = styled(Table)(() => ({
  height: '100%',
  tableLayout: 'fixed',
  width: '100%',
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  position: 'relative',
  fontSize: 16,
  padding: '40px 10px',
  '@media screen and (max-width: 300px)': { fontSize: 14 },
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 700,
    color: theme.palette.common.white,
    padding: '20px 16px',
    width: '90%',
  },
  [`&.${tableCellClasses.body}`]: {},
  fontWeight: 500,
  [`&:not(:first-of-type):not(.${tableCellClasses.head}):hover, .${tableCellClasses.head}`]:
    {
      backgroundColor: theme.palette.action.hover,
      '.edit-button': {
        transform: 'scale(1)',
        pointerEvents: 'auto',
      },
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: grey[50],
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const HeadingRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

export const CellControlBox = styled(Box)(() => ({
  display: 'flex',
  gap: '5px',
  margin: '0 auto 8px',
  justifyContent: 'flex-end',
  width: 'calc(100% - 20px)',
}));

export const CellEditBox = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100% - 20px)',
  '@media screen and (max-width: 350px)': {
    width: 'calc(100% - 10px)',
  }
}));

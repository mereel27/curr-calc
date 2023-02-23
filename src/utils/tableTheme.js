import { createTheme } from '@mui/material/styles';

const tableTheme = createTheme({
  palette: {
    primary: {
      main: '#0072F5',
      dark: '#005FCC',
    },
    secondary: {
      main: '#7828C8',
      dark: '#6622AA',
    },
    error: {
      main: '#F31260',
      dark: '#B80A47',
    },
    success: {
      main: '#17C964',
      dark: '#13A452',
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(','),
  }
});

export default tableTheme;
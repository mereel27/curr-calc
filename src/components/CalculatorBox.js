import { styled } from '@mui/material/styles';
import { Box } from "@mui/material";

const CalculatorBox = styled(Box)(() => ({
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  margin: '40px 0 20px'
}));

export default CalculatorBox;
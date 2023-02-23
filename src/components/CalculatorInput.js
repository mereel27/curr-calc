import { TextField } from "@mui/material";
import { styled } from '@mui/material/styles';

const CalculatorInput = styled(TextField)(() => ({
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  marginTop: '40px'
}));

export default CalculatorInput;
/* eslint-disable no-useless-escape */
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

export default function CellInput({
  isValid,
  value,
  checkValue,
  handleInput,
  handleChange,
  hidden,
}) {
  const min = (checkValue * 0.9).toFixed(2);
  const max = (checkValue * 1.1).toFixed(2);

  if (hidden) return null;

  return (
    <Tooltip
      arrow
      title="The value may differ by 10%"
      placement="top-start"
      PopperProps={{ sx: { display: !isValid ? '' : 'none' } }}
    >
      <TextField
        className='cell-input'
        variant="outlined"
        fullWidth
        color="primary"
        size="small"
        type="number"
        inputProps={{
          sx: {
            '@media screen and (max-width: 400px)': {
              padding: '5px',
            },
          },
          inputMode: 'numeric',
          pattern: 'd*',
          step: value / 100,
          min: min,
          max: max,
        }}
        defaultValue={value}
        error={!isValid}
        onKeyDown={handleInput}
        onPaste={handleInput}
        onChange={handleChange}
        focused
        sx={{
          margin: '0 auto',
          zIndex: '10',
          '.MuiInputBase-root': {
            backgroundColor: 'white',
          },
          '.MuiFormHelperText-root': {
            margin: '5px 0 0',
            fontSize: '10px',
            fontWeight: 700,
            zIndex: '10',
          },
        }}
      />
    </Tooltip>
  );
}

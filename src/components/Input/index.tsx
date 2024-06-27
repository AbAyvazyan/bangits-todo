import { ComponentProps, forwardRef } from 'react';
import { TextField } from '@mui/material';

interface InputProps extends ComponentProps<typeof TextField> {}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <TextField variant="outlined" {...props} ref={ref} sx={{ width: '100%' }} />;
});

export default Input;

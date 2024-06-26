import { ComponentProps, FC } from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps extends ComponentProps<typeof MuiButton> {
  children: string;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return <MuiButton {...props}>{children}</MuiButton>;
};

export default Button;

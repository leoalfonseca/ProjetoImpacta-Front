import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, TypographyProps } from '@mui/material';

interface CustomFormLabelProps extends TypographyProps {
  htmlFor?: string;
}

const CustomFormLabel = styled(
  ({ htmlFor, ...props }: CustomFormLabelProps) => (
    <Typography
      variant="subtitle1"
      fontWeight={600}
      component="label"
      htmlFor={htmlFor}
      {...props}
    />
  )
)(() => ({
  marginBottom: '5px',
  marginTop: '15px',
  display: 'block',
}));

export default CustomFormLabel;

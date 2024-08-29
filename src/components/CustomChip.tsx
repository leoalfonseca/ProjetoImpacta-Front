import { Chip } from '@mui/material';

type ICustomChipType =
  | 'success'
  | 'error'
  | 'warning'
  | 'primary'
  | 'analise'
  | 'recebida'
  | 'reanalisar'
  | 'grey';

interface ICustomChip {
  label: string;
  type: ICustomChipType;
  width?: string;
}
const CustomChip = ({ label, type, width = '100px' }: ICustomChip) => {
  let backgroundColor = '';

  switch (type) {
    case 'success':
      backgroundColor = '#18c595';
      break;
    case 'recebida':
      backgroundColor = '#9bb72e';
      break;
    case 'analise':
      backgroundColor = '#ac75f7';
      break;
    case 'error':
      backgroundColor = '#ff6363';
      break;
    case 'warning':
      backgroundColor = '#cfb03f';
      break;
    case 'primary':
      backgroundColor = '#66a6ff';
      break;
    case 'reanalisar':
      backgroundColor = '#f79a75';
      break;
    case 'grey':
      backgroundColor = '#9e9e9e';
      break;

    default:
      backgroundColor = '#5da364';
      break;
  }
  return (
    <Chip
      label={label}
      sx={{
        width: { width },
        height: '26px',
        backgroundColor: { backgroundColor },
        margin: '10px',
        paddingY: '3px',
        color: 'white',
      }}
    />
  );
};

export default CustomChip;

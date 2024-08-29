export const buttonStyles = {
  mx: 0.3,
  backgroundColor: '#004645',
  color: 'white',
  '&:hover': {
    backgroundColor: `#002d2d`,
    color: 'white',
  },
  '& .MuiButton-startIcon': {
    margin: 'auto',
  },
};
export const PaperModalStyles = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 'auto',
  maxHeight: 700,
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};
export const TitleModalStyles = { margin: '15px 0 30px', textAlign: 'center' };

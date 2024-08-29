import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

interface IConfirmationModalProps {
  open: boolean;
  isLoading?: boolean;
  title?: string;
  subtitle?: string;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmationModal = ({
  open,
  isLoading,
  title,
  subtitle,
  handleClose,
  handleConfirm,
}: IConfirmationModalProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title ? title : 'Ativar / Inativar'}</DialogTitle>
      <DialogContent>
        <p>
          {subtitle
            ? subtitle
            : 'Você tem certeza que deseja alterar o status?'}
        </p>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          color="secondary"
          onClick={handleClose}
          disabled={isLoading}
          sx={{
            backgroundColor: '#004645',
            color: 'white',
            '&:hover': {
              backgroundColor: `#002d2d`,
              color: 'white',
            },
            '& .MuiButton-startIcon': {
              margin: 'auto',
            },
          }}
          loadingPosition="start"
          variant="contained"
        >
          <span>Cancelar</span>
        </LoadingButton>
        <LoadingButton
          color="secondary"
          onClick={handleConfirm}
          loading={isLoading}
          sx={{
            backgroundColor: '#004645',
            color: 'white',
            '&:hover': {
              backgroundColor: `#002d2d`,
              color: 'white',
            },
            '& .MuiButton-startIcon': {
              margin: 'auto',
            },
          }}
          loadingPosition="start"
          variant="contained"
        >
          <span style={{ marginLeft: isLoading ? '20px' : '0px' }}>
            Confirmar
          </span>
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;

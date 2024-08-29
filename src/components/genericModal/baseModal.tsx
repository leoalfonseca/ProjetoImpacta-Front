/* eslint-disable */
import {
  Box,
  Box as Modal,
  Modal as ContainerModal,
  SxProps,
  useMediaQuery,
  Typography,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProviderProps } from '@mui/material/styles/ThemeProvider';
import { AppState, useSelector } from 'store/Store';

interface iModalGenericProps {
  isOpen: boolean;
  attachmentForm?: boolean;
  isLoading?: boolean;
  children: React.ReactElement;
  btnConfirm?: React.ReactNode;
  btnClose?: React.ReactNode;
  title: string;
  width?: string | '460px';
  handleClose: () => void;
  formikhandleSubmit?: () => void;
}

const GenericModal = (props: iModalGenericProps) => {
  const {
    children,
    isOpen,
    attachmentForm,
    title,
    width,
    handleClose,
    formikhandleSubmit,
    isLoading,
  }: iModalGenericProps = props;

  const fullScreen = useMediaQuery('(max-width: 760px)');
  const customizer = useSelector((state: AppState) => state.customizer);

  const ContainerModalCssProperty: SxProps<ThemeProviderProps> = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const modalContainerCssProperty: SxProps<ThemeProviderProps> =
    customizer.activeMode === 'dark'
      ? {
          backgroundColor: '#2A3447',
          minWidth: fullScreen ? '100%' : width,
          maxWidth: '1000px',
          maxHeight: fullScreen ? '100%' : '90%',
          minHeight: fullScreen ? '100%' : 'none',
          borderRadius: fullScreen ? '0px' : '8px',
          overflowX: 'scroll',
          '::-webkit-scrollbar': {
            backgroundColor: 'transparent',
            width: '7px',
          },
          '::-webkit-scrollbar-button': {
            backgroundColor: 'transparent',
            width: '5px',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#9b9a9aa0',
            borderRadius: '4px',
          },
          '::-webkit-scrollbar-corner': {
            backgroundColor: 'transparent',
          },
        }
      : {
          backgroundColor: 'whiteSmoke',
          minWidth: fullScreen ? '100%' : width,
          maxWidth: '1000px',
          maxHeight: fullScreen ? '100%' : '90%',
          minHeight: fullScreen ? '100%' : 'none',
          borderRadius: fullScreen ? '0px' : '8px',
          overflowX: 'scroll',
          '::-webkit-scrollbar': {
            backgroundColor: 'transparent',
            width: '7px',
          },
          '::-webkit-scrollbar-button': {
            backgroundColor: 'transparent',
            width: '5px',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#9b9a9aa0',
            borderRadius: '4px',
          },
          '::-webkit-scrollbar-corner': {
            backgroundColor: 'transparent',
          },
        };

  return (
    <ContainerModal
      open={isOpen}
      onClose={handleClose}
      //@ts-ignore
      sx={ContainerModalCssProperty}
      {...props}
    >
      <Modal
        typeof="div"
        //@ts-ignore
        sx={modalContainerCssProperty}
      >
        <Box
          typeof="header"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '25px 0px 30px 0px',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              width: fullScreen ? '80%' : '87%',
              textAlign: 'center',
            }}
          >
            {title ? title : 'TEXTO BASE'}
          </Typography>
          <Box
            typeof="button"
            onClick={handleClose}
            sx={{
              margin: 'auto 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '10px',
              cursor: 'pointer',
            }}
          >
            <CloseIcon fontSize="medium" />
          </Box>
        </Box>
        <Box
          typeof="main"
          sx={{
            maxWidth: '90%',
            margin: '0 auto',
            overflow: 'hidden',
            maxHeight: '95%',
          }}
        >
          {!attachmentForm ? (
            <form onSubmit={formikhandleSubmit}>
              {children}
              <Box
                display={'flex'}
                justifyContent={'right'}
                width={'100%'}
                pt={4}
                sx={{
                  margin: '20px 0px',
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleClose}
                  sx={
                    customizer.activeMode === 'dark'
                      ? {
                          backgroundColor: '#253662',
                          color: '#EAEFF4',
                          mr: 1,
                          '&:hover': {
                            backgroundColor: '#172342',
                            color: '#EAEFF4',
                          },
                          '& .MuiButton-startIcon': {
                            margin: 'auto',
                          },
                        }
                      : {
                          backgroundColor: '#5D87FF',
                          color: '#ffffff',
                          mr: 1,
                          '&:hover': {
                            backgroundColor: '#4261b7',
                            color: '#ffffff',
                          },
                          '& .MuiButton-startIcon': {
                            margin: 'auto',
                          },
                        }
                  }
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  sx={
                    customizer.activeMode === 'dark'
                      ? {
                          backgroundColor: '#253662',
                          color: '#EAEFF4',
                          '&:hover': {
                            backgroundColor: '#172342',
                            color: '#EAEFF4',
                          },
                          '& .MuiButton-startIcon': {
                            margin: 'auto',
                          },
                        }
                      : {
                          backgroundColor: '#5D87FF',
                          color: '#ffffff',
                          '&:hover': {
                            backgroundColor: '#4261b7',
                            color: '#ffffff',
                          },
                          '& .MuiButton-startIcon': {
                            margin: 'auto',
                          },
                        }
                  }
                >
                  Salvar
                </Button>
              </Box>
            </form>
          ) : (
            <Box mb={5}>{children}</Box>
          )}
        </Box>
      </Modal>
    </ContainerModal>
  );
};

export default GenericModal;

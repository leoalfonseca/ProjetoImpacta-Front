import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import {
  IconPaperclip,
  IconReportSearch,
  IconTrash,
} from '@tabler/icons-react';
import GenericModal from 'components/genericModal/baseModal';
import { GeneralContext } from 'context/GeneralContext';
import { useContext, useEffect, useState } from 'react';
import { AttachmentInnerProps } from 'types/attachment';

interface IAttachmentModalProps {
  open: boolean;
  handleClose: () => void;
  obj: any;
  type: string;
  isLoading?: boolean;
  canEdit: boolean;
}

const AttachmentModal = ({
  open,
  handleClose,
  obj,
  type,
  isLoading,
  canEdit,
}: IAttachmentModalProps) => {
  const { getAttachment, createAttachment, deleteAttachment } =
    useContext(GeneralContext);

  const [invalidTypeMessage, setInvalidTypeMessage] = useState(false);
  const [attachments, setAttachments] = useState<AttachmentInnerProps[]>([]);
  const [base64Result, setBase64Result] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleSaveFile = async () => {
    if (obj) {
      try {
        const newData = {
          entityId: obj.id,
          entityType: type,
          fileName: fileName,
          base64File: base64Result,
        };

        await createAttachment(newData);
      } catch (error) {
        console.log(error);
      } finally {
        getAttachments();
      }
    }
    setBase64Result(null);
  };

  const handleDeleteAttachment = async (filename: string | undefined) => {
    const name = filename?.split('.')[0];
    await deleteAttachment(name);
    getAttachments();
  };

  const getAttachments = async () => {
    const data = await getAttachment(type, obj.id);
    setAttachments(data);
  };

  const handleCloseAndClear = () => {
    handleClose();
    setBase64Result(null);
    setInvalidTypeMessage(false);
    setAttachments([]);
  };

  function convertePDFParaBase64(arquivoPDF: any) {
    return new Promise((resolve, reject) => {
      const leitor = new FileReader();
      const file = arquivoPDF.files && arquivoPDF.files[0];
      if (file) {
        if (file.type !== 'application/pdf') {
          setInvalidTypeMessage(true);
          return;
        }
        setInvalidTypeMessage(false);
        setFileName(file.name);
      } else {
        return;
      }
      leitor.onload = function () {
        const base64WithMimeType =
          leitor.result &&
          `data:application/pdf;base64,${
            typeof leitor.result === 'string' ? leitor.result.split(',')[1] : ''
          }`;
        setBase64Result(base64WithMimeType);
        resolve(base64WithMimeType);
      };
      leitor.onerror = function (error) {
        reject(error);
      };
      if (file) {
        leitor.readAsDataURL(file);
      } else {
        reject(new Error('Nenhum arquivo selecionado'));
      }
    });
  }

  const fileSelectedColor = base64Result
    ? { bgColor: '#00464521', contrastColor: '#004645' }
    : { bgColor: '#004645', contrastColor: '#fff' };

  useEffect(() => {
    if (open) {
      getAttachments();
    }
  }, [open]);

  return (
    <GenericModal
      isLoading={isLoading}
      attachmentForm={true}
      title="Anexos"
      width="50%"
      isOpen={open}
      handleClose={handleCloseAndClear}
    >
      <Box display={'flex'} flexWrap={'wrap'}>
        <Stack
          display="flex"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          mx={2.5}
          pb={4}
        >
          <Grid item xs={12}>
            <Typography variant="h5">Lista de anexos</Typography>
          </Grid>
          <InputAdornment
            sx={{ paddingTop: 2, marginTop: '0.8rem' }}
            position="end"
          >
            {invalidTypeMessage && (
              <Typography variant="body2" sx={{ color: 'red', marginRight: 2 }}>
                Favor selecionar um arquivo PDF
              </Typography>
            )}
            <Button
              variant="contained"
              component="label"
              disabled={!canEdit}
              startIcon={<IconPaperclip size={18} />}
              sx={{
                backgroundColor: fileSelectedColor.bgColor,
                color: fileSelectedColor.contrastColor,
                '&:hover': {
                  backgroundColor: `#002d2d`,
                  color: 'white',
                },
                '& .MuiButton-startIcon': {
                  margin: 'auto',
                  marginRight: '1px',
                },
              }}
            >
              Novo anexo
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => convertePDFParaBase64(e.target)}
                hidden
              />
            </Button>

            {base64Result && (
              <>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<IconPaperclip size={18} />}
                  sx={{
                    marginX: '1rem',
                    backgroundColor: '#4eb68f',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: `#002d2d`,
                      color: 'white',
                    },
                    '& .MuiButton-startIcon': {
                      margin: 'auto',
                      marginRight: '1px',
                    },
                  }}
                  onClick={handleSaveFile}
                >
                  Salvar
                </Button>
                <Typography variant="body2"> {fileName} </Typography>
              </>
            )}
          </InputAdornment>
        </Stack>

        <Grid container spacing={4}>
          <Grid item xs={12} display="flex" flexDirection="column" gap={1}>
            <Box
              sx={{
                maxHeight: '400px',
                overflowY: 'auto',
              }}
            >
              {attachments
                .map((result) => {
                  return (
                    <Box
                      key={result.id}
                      flex={1}
                      p={2}
                      bgcolor="#f5f5f5"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={1}
                      display="flex"
                    >
                      <Typography variant="button">{result?.name}</Typography>
                      <Box>
                        <Button
                          variant="contained"
                          sx={{
                            mx: 0.3,
                            backgroundColor: '#ff6363',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: `#752d2d`,
                              color: 'white',
                            },
                            '& .MuiButton-startIcon': {
                              margin: 'auto',
                            },
                          }}
                          onClick={() =>
                            handleDeleteAttachment(result?.fileName)
                          }
                        >
                          <IconTrash />
                        </Button>
                        <a
                          href={`${process.env.API_URL}/uploads/${result.fileName}`}
                          target="_blank"
                        >
                          <Button
                            variant="contained"
                            // component="label"
                            startIcon={<IconReportSearch size={18} />}
                            sx={{
                              mx: 0.3,
                              color: '#fff',
                              backgroundColor: `#004645`,
                              '&:hover': {
                                backgroundColor: `#002d2d`,
                                color: 'white',
                              },
                              '& .MuiButton-startIcon': {
                                margin: 'auto',
                                marginRight: '10px',
                              },
                            }}
                          >
                            Visualizar Anexo
                          </Button>
                        </a>
                      </Box>
                    </Box>
                  );
                })
                .filter((el) => el !== undefined)}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </GenericModal>
  );
};

export default AttachmentModal;

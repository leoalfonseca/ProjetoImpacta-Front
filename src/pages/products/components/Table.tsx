import { Box, Button, Grid, Menu, MenuItem } from '@mui/material';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { ProductContext } from 'context/ProductContext';
import ptBRLocale from 'date-fns/locale/pt-BR';
import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import RegisterForm from './RegisterForm';
import React, { useContext, useEffect, useState } from 'react';
import { ProductProps } from 'types/product';
import * as XLSX from 'xlsx';
import EditForm from './EditForm';
import { useSelector } from 'react-redux';
import { AppState } from 'store/Store';
import { UserContext } from 'context/UserContext';

const UsersTable = () => {
  const [downloadMenuAnchor, setDownloadMenuAnchor] =
    useState<null | HTMLElement>(null);

  const handleDownloadMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDownloadMenuAnchor(event.currentTarget);
  };

  const handleDownloadMenuClose = () => {
    setDownloadMenuAnchor(null);
  };

  const handleExportToPDF = () => {
    const exportData: any = rows.map((item) => ({
      Produto: item.name,
      Responsável: item?.user?.name || 'Sem responsável',
      Estoque: item.stock,
    }));

    const doc = new jsPDF('l', 'mm', [297, 400]);

    const columns = [
      { header: 'Produto', dataKey: 'Produto' },
      { header: 'Responsável', dataKey: 'Responsável' },
      { header: 'Estoque', dataKey: 'Estoque' },
    ];

    const rowsPDF = exportData.map((row: any) => {
      return [row.Produto, row['Responsável'], row.Estoque];
    });

    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: rowsPDF,
    });

    const pdfBlob = doc.output('blob');

    saveAs(pdfBlob, 'Exportação Produtos.pdf');
  };

  const handleExportToExcel = () => {
    const exportData = rows.map((item) => ({
      Produto: item.name,
      Responsável: item?.user?.name || 'Sem responsável',
      Estoque: item.stock,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Dados');

    const excelBase64 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });

    const byteCharacters = atob(excelBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const excelBlob = new Blob([new Uint8Array(byteNumbers)], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(excelBlob, 'Exportação Produtos.xlsx');
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Produto',
      headerClassName: 'header',
      flex: 1,
    },
    {
      field: 'product.name',
      headerName: 'Nome de usuário',
      headerClassName: 'header',
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Estoque',
      headerClassName: 'header',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      type: 'actions',
      minWidth: 240,
      headerClassName: 'header',
      renderCell: (params: { row: any }) => (
        <Box>
          <Button
            startIcon={<IconEdit />}
            onClick={() => handleEditUser(params.row.id)}
            sx={
              customizer.activeMode === 'dark'
                ? {
                    backgroundColor: '#253662',
                    color: '#EAEFF4',
                    mr: 0.8,
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
                    mr: 0.8,
                    '&:hover': {
                      backgroundColor: '#4261b7',
                      color: '#ffffff',
                    },
                    '& .MuiButton-startIcon': {
                      margin: 'auto',
                    },
                  }
            }
          />
          <Button onClick={() => handleDelete(params.row.id)} color="error">
            <IconTrash />
          </Button>
        </Box>
      ),
    },
  ];

  const [rows, setRows] = useState<ProductProps[]>([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingObj, setEditingObj] = useState<ProductProps | null>(null);
  const customizer = useSelector((state: AppState) => state.customizer);
  const [resObj, setResObj] = useState<any>({
    users: [],
  });

  const handleOpen = () => setOpen(true);

  const handleOpenEdit = async () => {
    try {
      setOpenEdit(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);

    setTimeout(async () => {
      getList();
    }, 1000);
  };

  const { getProducts, deleteProduct } = useContext(ProductContext);
  const { getUsers } = useContext(UserContext);

  const getList = async () => {
    const list = await getProducts();
    setRows(list);
  };

  const handleEditUser = (id: string) => {
    const objToEdit = rows.find((product) => product.id === id);

    if (objToEdit) {
      setEditingObj(objToEdit);
      handleOpenEdit();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteProduct(id);
    await getList();
  };

  const requestFunc = async () => {
    try {
      const resUsers = await getUsers();

      setResObj({
        users: resUsers,
      });
    } catch (error) {
       console.log(error);
    }
  };

  useEffect(() => {
    getList();
    requestFunc();
  }, []);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ptBRLocale}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            display={'flex'}
            alignItems={'right'}
            justifyContent={'right'}
            marginRight={5}
          >
            <Button
              onClick={handleDownloadMenuOpen}
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
              Exportar
            </Button>
            <Menu
              anchorEl={downloadMenuAnchor}
              open={Boolean(downloadMenuAnchor)}
              onClose={handleDownloadMenuClose}
            >
              <MenuItem onClick={handleExportToExcel}>Excel</MenuItem>
              <MenuItem onClick={handleExportToPDF}>PDF</MenuItem>
            </Menu>
            <Button
              onClick={handleOpen}
              startIcon={<IconPlus />}
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
              Adicionar Novo
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            height={350}
            width="100%"
            paddingX={5}
            sx={{
              '& .header': {
                backgroundColor: 'primary',
              },
            }}
          >
            <DataGrid
              rows={rows || []}
              columns={columns}
              hideFooterSelectedRowCount
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              autoHeight
              pageSizeOptions={[5, 10, 50, 100]}
              sx={{
                border: 1,
                borderColor: 'divider',
                '& .MuiDataGrid-cell': {
                  border: 1,
                  borderColor: 'divider',
                  ':focus': {
                    outline: 'none',
                  },
                  cursor: 'default',
                },
              }}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            />
          </Box>
        </Grid>
      </Grid>

      <RegisterForm open={open} handleClose={handleClose} resObj={resObj} />
      <EditForm
        open={openEdit}
        handleClose={handleClose}
        obj={editingObj}
        resObj={resObj}
      />
    </LocalizationProvider>
  );
};

export default UsersTable;

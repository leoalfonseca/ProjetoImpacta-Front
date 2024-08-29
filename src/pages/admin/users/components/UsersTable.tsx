import { Box, Button, Grid, Menu, MenuItem } from '@mui/material';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import CustomChip from 'components/CustomChip';
import { UserContext } from 'context/UserContext';
import ptBRLocale from 'date-fns/locale/pt-BR';
import saveAs from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import UserRegisterForm from 'pages/admin/users/components/UserRegisterForm';
import React, { useContext, useEffect, useState } from 'react';
import { UserProps } from 'types/user';
import * as XLSX from 'xlsx';
import EditUserForm from './EditUserForm';
import { IValueGetter } from 'types/valueGetter';
import { get } from 'http';
import { useSelector } from 'react-redux';
import { AppState } from 'store/Store';

const UsersTable = () => {
  const [downloadMenuAnchor, setDownloadMenuAnchor] =
    useState<null | HTMLElement>(null);

  const handleDownloadMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setDownloadMenuAnchor(event.currentTarget);
  };

  const handleDownloadMenuClose = () => {
    setDownloadMenuAnchor(null);
  };

  const handleExportToExcel = () => {
    const exportData = rows.map((item) => ({
      Status: item.status,
      Nome: item.name,
      'Nome de Usuário': item.username,
      Email: item.email,
      Budget: item.budget,
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

    saveAs(excelBlob, 'Exportação Usuários.xlsx');
  };

  const handleExportToPDF = () => {
    const exportData: any = rows.map((item) => ({
      Status: item.status,
      Nome: item.name,
      'Nome de Usuário': item.username,
      Email: item.email,
      Budget: item.budget,
    }));

    const doc = new jsPDF('l', 'mm', [297, 400]);

    const columns = [
      { header: 'Status', dataKey: 'Status' },
      { header: 'Nome', dataKey: 'Nome' },
      { header: 'Nome de Usuário', dataKey: 'Nome de Usuário' },
      { header: 'Email', dataKey: 'Email' },
      { header: 'Budget', dataKey: 'Budget' },
    ];

    const rowsPDF = exportData.map((row: any) => {
      return [
        row.Status,
        row.Nome,
        row['Nome de Usuário'],
        row.Email,
        row.Budget,
      ];
    });

    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: rowsPDF,
    });

    const pdfBlob = doc.output('blob');

    saveAs(pdfBlob, 'Exportação Usuários.pdf');
  };

  const columns = [
    {
      field: 'status',
      headerName: 'Status',
      headerClassName: 'header',
      flex: 0.5,
      minWidth: 140,
      type: 'singleSelect',
      valueOptions: ['Ativo', 'Inativo'],
      valueGetter: (params: any) => {
        return params.value ? 'Ativo' : 'Inativo';
      },
      renderCell: (params: any) => (
        <Box>
          {params.value === 'Ativo' ? (
            <CustomChip label="Ativo" type="success" />
          ) : params.value === 'Inativo' ? (
            <CustomChip label="Inativo" type="error" />
          ) : null}
        </Box>
      ),
    },
    {
      field: 'name',
      headerName: 'Nome',
      headerClassName: 'header',
      flex: 1,
    },
    {
      field: 'username',
      headerName: 'Nome de usuário',
      headerClassName: 'header',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      headerClassName: 'header',
      flex: 1,
    },
    {
      field: 'budget',
      headerName: 'Budget',
      headerClassName: 'header',
      flex: 1,
      valueGetter: (params: IValueGetter) => {
        return 'R$ ' + params.value + 'k';
      },
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
          <Button onClick={() => handleDeleteUser(params.row.id)} color="error">
            <IconTrash />
          </Button>
        </Box>
      ),
    },
  ];

  const [rows, setRows] = useState<UserProps[]>([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProps | null>(null);
  const customizer = useSelector((state: AppState) => state.customizer);

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
    getUsersList();
  };

  const { getUsers, deleteUser, users } = useContext(UserContext);

  const getUsersList = async () => {
    const usersList = await getUsers();
    setRows(usersList);
  };

  const handleEditUser = (userId: string) => {
    const userToEdit = rows.find((user) => user.id === userId);

    if (userToEdit) {
      setEditingUser(userToEdit);
      handleOpenEdit();
    }
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    setRows(users);
  }, [users]);

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
              rows={rows}
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

      <UserRegisterForm open={open} handleClose={handleClose} />
      <EditUserForm
        open={openEdit}
        handleClose={handleClose}
        user={editingUser}
      />
    </LocalizationProvider>
  );
};

export default UsersTable;

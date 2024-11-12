import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Select,
} from '@mui/material';
import GenericModal from 'components/genericModal/baseModal';
import { UserContext } from 'context/UserContext';
import { useFormik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { UserProps } from 'types/user';
import { compareValues } from 'utils/compareValues';
import * as yup from 'yup';

interface EditUserFormProps {
  open: boolean;
  handleClose: () => void;
  user: UserProps | null;
}

const EditUserForm = ({ open, handleClose, user }: EditUserFormProps) => {
  const { editUser } = useContext(UserContext);

  const [initialValues, setInitialValues] = useState({
    id: user?.id || '',
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
  });

  const schemaUsers = yup.object({
    name: yup.string(),
    username: yup.string(),
    email: yup.string().email('Email inválido'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schemaUsers,
    onSubmit: async (values) => {
      if (user) {
        const dataUpdated = compareValues(initialValues, values);

        if (Object.keys(dataUpdated).length > 0) {
          await editUser(user.id ?? '', dataUpdated);
        } else {
          toast.error('Nenhuma alteração foi feita!');
        }

        formik.resetForm();
        handleCloseAndClear();
      }
    },
  });

  const handleCloseAndClear = () => {
    handleClose();
    formik.resetForm();
  };

  useEffect(() => {
    if (user) {
      formik.setFieldValue('id', user?.id);
      formik.setFieldValue('name', user?.name);
      formik.setFieldValue('username', user?.username);
      formik.setFieldValue('email', user?.email);

      setInitialValues({
        id: user?.id,
        name: user?.name,
        email: user?.email,
        username: user?.username,
      });
    }
  }, [user]);

  return (
    <GenericModal
      isLoading={false}
      handleClose={handleCloseAndClear}
      formikhandleSubmit={formik.handleSubmit}
      isOpen={open}
      title="Editar Usuário"
    >
      <Grid container spacing={3} sx={{ marginTop: '10px' }}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Nome *"
              fullWidth
              id="name"
              {...formik.getFieldProps('name')}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            <Typography color="error">
              {formik.touched.name && formik.errors.name}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Nome de usuário *"
              fullWidth
              id="username"
              {...formik.getFieldProps('username')}
              error={formik.touched.username && Boolean(formik.errors.username)}
            />
            <Typography color="error">
              {formik.touched.username && formik.errors.username}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Email *"
              fullWidth
              id="email"
              {...formik.getFieldProps('email')}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            <Typography color="error">
              {formik.touched.email && formik.errors.email}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
    </GenericModal>
  );
};

export default EditUserForm;

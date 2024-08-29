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
    status: user?.status || '',
    name: user?.name || '',
    username: user?.username || '',
    email: user?.email || '',
    budget: user?.budget || '',
  });

  const schemaUsers = yup.object({
    status: yup.string(),
    name: yup.string(),
    username: yup.string(),
    budget: yup.number(),
    email: yup.string().email('Email inválido'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schemaUsers,
    onSubmit: (values) => {
      if (user) {
        const dataUpdated = compareValues(initialValues, values);

        if (Object.keys(dataUpdated).length > 0) {
          editUser(user.id, dataUpdated);
          handleCloseAndClear();
        } else {
          toast.error('Nenhuma alteração foi feita!');
        }
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
      formik.setFieldValue('status', user?.status);
      formik.setFieldValue('name', user?.name);
      formik.setFieldValue('username', user?.username);
      formik.setFieldValue('email', user?.email);
      formik.setFieldValue('budget', user?.budget);

      setInitialValues({
        id: user?.id,
        status: user?.status,
        name: user?.name,
        email: user?.email,
        username: user?.username,
        budget: user?.budget,
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
              name="name"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Nome de usuário *"
              fullWidth
              name="username"
              id="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Email *"
              fullWidth
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Budget *"
              fullWidth
              name="budget"
              id="budget"
              value={formik.values.budget}
              onChange={formik.handleChange}
              error={formik.touched.budget && Boolean(formik.errors.budget)}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="status" htmlFor="status">
              Status *
            </InputLabel>
            <Select
              label="Status *"
              labelId="status"
              id="status"
              {...formik.getFieldProps('status')}
              error={formik.touched.status && Boolean(formik.errors.status)}
            >
              <MenuItem value={'Ativo'}>Ativo</MenuItem>
              <MenuItem value={'Inativo'}>Inativo</MenuItem>
            </Select>
            <Typography color="error">
              {formik.touched.status && formik.errors.status}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
    </GenericModal>
  );
};

export default EditUserForm;

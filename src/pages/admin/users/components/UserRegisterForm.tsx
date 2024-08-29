import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import GenericModal from 'components/genericModal/baseModal';
import { UserContext } from 'context/UserContext';
import { useFormik } from 'formik';
import { useContext } from 'react';
import * as yup from 'yup';

interface IUserRegisterProps {
  open: boolean;
  handleClose: () => void;
}

interface IFormValues {
  id: string;
  status: string;
  name: string;
  username: string;
  email: string;
  budget: number;
}

const UserRegisterForm = ({ open, handleClose }: IUserRegisterProps) => {
  const { createUser, users } = useContext(UserContext);

  const schemaUsers = yup.object({
    status: yup.string().required('Campo Obrigatório'),
    name: yup.string().required('Campo Obrigatório'),
    username: yup.string().required('Campo Obrigatório'),
    budget: yup.number().required('Campo Obrigatório'),
    // email: yup.string().email('Email inválido').required('Campo Obrigatório'),
  });

  const initialValues: IFormValues = {
    id: '',
    status: '',
    name: '',
    username: '',
    email: '',
    budget: 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schemaUsers,
    onSubmit: (values) => {
      try {
        values.id = crypto.randomUUID();
        createUser(values);
      } catch (error) {
        console.log(error);
      } finally {
        handleCloseAndClear();
      }
    },
  });

  const handleCloseAndClear = () => {
    handleClose();
    formik.resetForm();
  };

  return (
    <GenericModal
      handleClose={handleCloseAndClear}
      isOpen={open}
      formikhandleSubmit={formik.handleSubmit}
      title="Dados do Usuário"
      isLoading={false}
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
              name="username"
              id="username"
              value={formik.values.username}
              onChange={formik.handleChange}
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
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            <Typography color="error">
              {formik.touched.email && formik.errors.email}
            </Typography>
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

export default UserRegisterForm;

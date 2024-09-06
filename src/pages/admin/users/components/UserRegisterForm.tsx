import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import GenericModal from 'components/genericModal/baseModal';
import { UserContext } from 'context/UserContext';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { UserProps } from 'types/user';
import * as yup from 'yup';

interface IUserRegisterProps {
  open: boolean;
  handleClose: () => void;
}

const UserRegisterForm = ({ open, handleClose }: IUserRegisterProps) => {
  const { createUser } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show: any) => !show);

  const schemaUsers = yup.object({
    name: yup.string().required('Campo Obrigatório'),
    username: yup.string().required('Campo Obrigatório'),
    email: yup.string().email('Email inválido').required('Campo Obrigatório'),
  });

  const initialValues: UserProps = {
    id: '',
    name: '',
    username: '',
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schemaUsers,
    onSubmit: (values) => {
      try {
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
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">
              Senha *
            </InputLabel>
            <OutlinedInput
              fullWidth
              label="Senha *"
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...formik.getFieldProps('password')}
              error={formik.touched.password && Boolean(formik.errors.password)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
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

export default UserRegisterForm;

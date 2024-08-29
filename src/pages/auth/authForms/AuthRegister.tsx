import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from '@mui/material';
import { loginType } from 'types/auth/auth';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { AuthContext } from 'context/AuthContext';
import { UserProps } from 'types/user';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import CustomFormLabel from 'components/forms/theme-elements/CustomFormLabel';
import CustomTextField from 'components/forms/theme-elements/CustomTextField';

const AuthRegister = ({ title, subtitle, subtext }: loginType) => {
  const { signUp, setLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const schemaLogin = yup.object({
    username: yup.string().required('Usuário Obrigatório'),
    email: yup.string().email('Email inválido').required('Campo Obrigatório'),
    name: yup.string().required('Campo Obrigatório'),
    password: yup.string().required('Senha Obrigatória'),
  });

  const initialValues: UserProps = {
    id: '',
    username: '',
    name: '',
    email: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schemaLogin,
    onSubmit: async (values) => {
      try {
        await signUp(values);
        formik.resetForm();
        setLogin(true);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Grid container>
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="name">Nome Completo *</CustomFormLabel>
          <CustomTextField
            id="name"
            variant="outlined"
            fullWidth
            {...formik.getFieldProps('name')}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="username">Usuário *</CustomFormLabel>
          <CustomTextField
            id="username"
            variant="outlined"
            fullWidth
            {...formik.getFieldProps('username')}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomFormLabel htmlFor="email">Email *</CustomFormLabel>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <CustomFormLabel htmlFor="password">Senha *</CustomFormLabel>
            <OutlinedInput
              fullWidth
              name="password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formik.values.password}
              onChange={formik.handleChange}
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
              {formik.touched.password && formik.errors.password}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12} my={3}>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Registrar
          </Button>
        </Grid>
        <Grid item xs={12} textAlign={'center'}>
          {subtitle}
        </Grid>
      </Grid>
    </form>
  );
};

export default AuthRegister;

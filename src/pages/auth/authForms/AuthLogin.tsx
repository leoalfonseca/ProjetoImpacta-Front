import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import { loginType } from 'types/auth/auth';
import CustomCheckbox from 'components/forms/theme-elements/CustomCheckbox';
import CustomTextField from 'components/forms/theme-elements/CustomTextField';
import CustomFormLabel from 'components/forms/theme-elements/CustomFormLabel';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { AuthContext } from 'context/AuthContext';
import { VisibilityOff, Visibility } from '@mui/icons-material';

interface IFormValues {
  username: string;
  password: string;
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const { signIn } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show: any) => !show);

  const schemaLogin = yup.object({
    username: yup.string().required('Usuário Obrigatório'),
    password: yup.string().required('Senha Obrigatória'),
  });

  const initialValues: IFormValues = {
    username: '',
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schemaLogin,
    onSubmit: async (values) => {
      try {
        await signIn(values);
        formik.resetForm();
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

      {/* <AuthSocialButtons title="Entrar com" />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            ou entre com
          </Typography>
        </Divider>
      </Box> */}

      <Stack>
        <Box>
          <CustomFormLabel htmlFor="username">Usuário</CustomFormLabel>
          <CustomTextField
            id="username"
            variant="outlined"
            fullWidth
            {...formik.getFieldProps('username')}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
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
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Lembrar este dispositivo"
            />
          </FormGroup>
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Entrar
        </Button>
      </Box>
      <Box textAlign={'center'} mt={2}>
        {subtitle}
      </Box>
    </form>
  );
};

export default AuthLogin;

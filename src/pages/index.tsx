import { Link } from '@mui/material';
import { Grid, Box, Card, Stack, Typography, Button } from '@mui/material';

// components
import PageContainer from 'components/container/PageContainer';
import Logo from 'layouts/full/shared/logo/Logo';
import AuthLogin from './auth/authForms/AuthLogin';
import AuthRegister from './auth/authForms/AuthRegister';
import { useContext, useState } from 'react';
import { AuthContext } from 'context/AuthContext';

const Login = () => {
  const { login, setLogin } = useContext(AuthContext);

  return (
    <PageContainer>
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: '100vh' }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={5}
            xl={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              {login ? (
                <AuthLogin
                  subtitle={
                    <Typography>
                      Novo por aqui?{' '}
                      <Link href="#" onClick={() => setLogin(false)}>
                        Cadastre-se
                      </Link>
                    </Typography>
                  }
                />
              ) : (
                <AuthRegister
                  subtitle={
                    <Typography>
                      Já possui conta?{' '}
                      <Link href="#" onClick={() => setLogin(true)}>
                        Entrar
                      </Link>
                    </Typography>
                  }
                />
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

Login.layout = 'Blank';
export default Login;

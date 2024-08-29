import React, { Suspense, useContext, useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeSettings } from 'theme/Theme';
import createEmotionCache from 'createEmotionCache';
import { Provider } from 'react-redux';
import Store from 'store/Store';
import RTL from 'layouts/full/shared/customizer/RTL';
import { useSelector } from 'store/Store';
import { AppState } from 'store/Store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import BlankLayout from 'layouts/blank/BlankLayout';
import FullLayout from 'layouts/full/FullLayout';

import '_mockApis';
import 'utils/i18n';

// CSS FILES
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { UserProvider } from 'context/UserContext';
import { AuthContext, AuthProvider } from 'context/AuthContext';
import { storageGetToken } from 'storage/storageToken';

import './styles.css';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const layouts: any = {
  Blank: BlankLayout,
};

const MyApp = (props: MyAppProps) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
  }: any = props;
  const theme = ThemeSettings();
  const customizer = useSelector((state: AppState) => state.customizer);

  const layout = pageProps.layout || 'Full';
  const Layout = layouts[Component.layout] || FullLayout;

  return (
    //@ts-ignore
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <RTL direction={customizer.activeDir}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RTL>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default (props: MyAppProps) => (
  <Provider store={Store}>
    {/* @ts-expect-error*/}
    <AuthProvider>
      <UserProvider>
        <MyApp {...props} />
      </UserProvider>
    </AuthProvider>
    {/* @ts-expect-error*/}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="colored"
    />
  </Provider>
);

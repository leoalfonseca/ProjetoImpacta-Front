import { styled, Container, Box, useTheme } from '@mui/material';
import { useSelector } from 'store/Store';
import { AppState } from 'store/Store';
import Header from './vertical/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';
import Customizer from './shared/customizer/Customizer';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '99vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}));

interface Props {
  children: React.ReactNode;
}

// const FullLayout: FC = ({children}) => {
const FullLayout: React.FC<Props> = ({ children }) => {
  const customizer = useSelector((state: AppState) => state.customizer);

  const theme = useTheme();

  return (
    <MainWrapper>
      <Sidebar />

      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up('lg')]: {
              ml: `${customizer.MiniSidebarWidth}px`,
            },
          }),
        }}
      >
        <Header />
        <Container disableGutters={true} maxWidth={false}>
          {/* ------------------------------------------- */}
          {/* PageContent */}
          {/* ------------------------------------------- */}

          <Box sx={{ minHeight: 'calc(100vh - 170px)', mx: 5 }}>
            {/* <Outlet /> */}
            {children}
            {/* <Index /> */}
          </Box>

          {/* ------------------------------------------- */}
          {/* End Page */}
          {/* ------------------------------------------- */}
        </Container>
        {/* <Customizer /> */}
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;

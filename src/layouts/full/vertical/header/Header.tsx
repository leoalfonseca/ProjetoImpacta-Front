import {
  IconButton,
  Box,
  AppBar,
  useMediaQuery,
  Toolbar,
  styled,
  Stack,
  Button,
} from '@mui/material';
import { useSelector, useDispatch } from '../../../../store/Store';
import {
  toggleSidebar,
  toggleMobileSidebar,
  setDarkMode,
} from '../../../../store/customizer/CustomizerSlice';
import { IconMenu2, IconMoon, IconSun } from '@tabler/icons-react';
import Notifications from './Notification';
import Profile from './Profile';
import Cart from './Cart';
import Search from './Search';
import Language from './Language';
import { AppState } from '../../../../store/Store';
import Navigation from './Navigation';
import MobileRightSidebar from './MobileRightSidebar';

const Header = () => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const lgDown = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

  // drawer
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  const handleDarkMode = () => {
    if (customizer.activeMode === 'dark') {
      dispatch(setDarkMode('light'));
    } else {
      dispatch(setDarkMode('dark'));
    }
  };

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={
            lgUp
              ? () => dispatch(toggleSidebar())
              : () => dispatch(toggleMobileSidebar())
          }
        >
          <IconMenu2 size="20" />
        </IconButton>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          {/* <Language /> */}

          <IconButton onClick={handleDarkMode}>
            {customizer.activeMode === 'light' ? (
              <IconMoon size="20" />
            ) : (
              <IconSun size="20" />
            )}
          </IconButton>
          <Notifications />
          {lgDown ? <MobileRightSidebar /> : null}
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;

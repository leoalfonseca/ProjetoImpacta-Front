import Head from 'next/head';
import Box from '@mui/material/Box';
import Breadcrumb from 'layouts/full/shared/breadcrumb/Breadcrumb';
import UsersTable from './components/UsersTable';
import { ProtectRoute } from 'components/ProtectRoute';

const GroupPage = () => {
  const breadcrumbItems = [
    {
      title: 'Administração',
      to: '/home',
    },
  ];

  return (
    // <ProtectRoute>
    <Box display="flex" flexDirection="column" height="80vh">
      <Head>
        <title>Usuários</title>
      </Head>

      <Box>
        <Breadcrumb title="Usuários" items={breadcrumbItems} />
      </Box>

      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        marginTop={3}
      >
        <UsersTable />
      </Box>
    </Box>
    // </ProtectRoute>
  );
};

export default GroupPage;

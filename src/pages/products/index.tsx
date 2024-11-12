import Head from 'next/head';
import Box from '@mui/material/Box';
import Breadcrumb from 'layouts/full/shared/breadcrumb/Breadcrumb';
import Table from './components/Table';
import { ProtectRoute } from 'components/ProtectRoute';

const GroupPage = () => {
  const breadcrumbItems = [
    {
      title: 'Produtos',
      to: '/admin/users',
    },
  ];

  return (
    <ProtectRoute>
    <Box display="flex" flexDirection="column" height="80vh">
      <Head>
        <title>Produtos</title>
      </Head>

      <Box>
        <Breadcrumb title="Produtos" items={breadcrumbItems} />
      </Box>

      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        marginTop={3}
      >
        <Table />
      </Box>
    </Box>
    </ProtectRoute>
  );
};

export default GroupPage;

import NextLink from 'next/link';
import { Stack, Typography, Avatar, Box, AvatarGroup } from '@mui/material';
import { IconMessage2 } from '@tabler/icons-react';
import DashboardCard from '../../shared/DashboardCard';

const Social = () => {
  return (
    <DashboardCard>
      <>
        <Stack direction="row" spacing={2}>
          <Avatar
            src={'/images/profile/user-2.jpg'}
            alt={'ProfileImg'}
            sx={{ borderRadius: '8px', width: 70, height: 70 }}
          />
          <Box>
            <Typography variant="h5">
              Excelente serviço, recomendo fortemente!
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              22 de Março, 2024
            </Typography>
          </Box>
        </Stack>
        <Stack direction="row" justifyContent="space-between" mt={5} mb={2}>
          <AvatarGroup max={4}>
            <Avatar alt="Travis Howard" src={'/images/profile/user-2.jpg'} />
            <Avatar alt="Cindy Baker" src={'/images/profile/user-3.jpg'} />
            <Avatar alt="Agnes Walker" src={'/images/profile/user-4.jpg'} />
          </AvatarGroup>
          <NextLink href="/">
            <Box
              width="40px"
              height="40px"
              bgcolor="primary.light"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                color="primary.main"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <IconMessage2 width={22} />
              </Typography>
            </Box>
          </NextLink>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default Social;

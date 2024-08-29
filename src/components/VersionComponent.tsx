import {
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import packageJson from '../../package.json';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { useEffect, useState } from 'react';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: '#333',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

function VersionComponent() {
  const { t } = useTranslation();
  const [version, setVersion] = useState('');

  const getVersion = async () => {
    try {
      const { data } = await api.get('/');
      setVersion(data.version);
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    getVersion();
  });

  return (
    <LightTooltip title={t('Versão')} placement="top">
      <Typography
        sx={{
          textAlign: 'center',
          paddingBottom: 2,
          fontSize: '.75rem',
          color: 'white',
        }}
        variant="body1"
      >
        V. {version}
      </Typography>
    </LightTooltip>
  );
}

export default VersionComponent;

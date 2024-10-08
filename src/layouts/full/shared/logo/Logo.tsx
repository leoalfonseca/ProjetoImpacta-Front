import { useSelector } from '../../../../store/Store';
import Link from 'next/link';
import { styled } from '@mui/material';
import { AppState } from '../../../../store/Store';
import Image from 'next/image';
import { IconArrowsExchange } from '@tabler/icons-react';

const Logo = () => {
  const customizer = useSelector((state: AppState) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled href="/">
        {customizer.activeMode === 'dark' ? (
          <IconArrowsExchange
            color="white"
            height={customizer.TopbarHeight}
            width={200}
          />
        ) : (
          <IconArrowsExchange
            color="black"
            height={customizer.TopbarHeight}
            width={200}
          />
        )}
      </LinkStyled>
    );
  }

  return (
    <LinkStyled href="/">
      {customizer.activeMode === 'dark' ? (
        <Image
          src="/images/logos/dark-rtl-logo.svg"
          alt="logo"
          height={customizer.TopbarHeight}
          width={174}
          priority
        />
      ) : (
        <Image
          src="/images/logos/light-logo-rtl.svg"
          alt="logo"
          height={customizer.TopbarHeight}
          width={174}
          priority
        />
      )}
    </LinkStyled>
  );
};

export default Logo;

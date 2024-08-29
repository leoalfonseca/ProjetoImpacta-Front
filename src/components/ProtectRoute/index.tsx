import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { storageGetToken } from 'storage/storageToken';

interface IProtectRoute {
  children: ReactNode;
}

export const ProtectRoute = ({ children }: IProtectRoute) => {
  const router = useRouter();

  useEffect(() => {
    const token = storageGetToken();

    if (!token) {
      router.push('/');
    }
  }, []);

  return <>{children}</>;
};

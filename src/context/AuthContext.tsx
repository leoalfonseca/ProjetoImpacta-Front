import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { api } from 'services/api';
import { storageRemoveToken, storageSetToken } from 'storage/storageToken';
import encrypt from 'utils/crypto/encrypt';
import { AuthProps, UserProps } from 'types/user';

interface IAuthProvider {
  children: React.ReactNode;
}

interface IAuthContext {
  signIn: (dataLogin: AuthProps) => void;
  signOut: () => void;
  signUp: (dataUser: UserProps) => void;
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext({} as IAuthContext);

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const router = useRouter();
  const [login, setLogin] = useState(true);

  const signIn = async (dataLogin: AuthProps) => {
    try {
      const { username, password } = dataLogin;
      const encryptedUsername = encrypt({ text: username });
      const encryptedPassword = encrypt({ text: password });

      const { data } = await api.post('auth/signin', {
        username: encryptedUsername,
        password: encryptedPassword,
      });

      storageSetToken(data.token);

      api.defaults.headers.Authorization = `Bearer ${data.token}`;

      toast.success('Usuário logado com sucesso!');

      router.push('/home');
    } catch (error: any) {
      toast.error('Usuário ou senha inválidos');
      throw error;
    }
  };

  const signUp = async (dataUser: UserProps) => {
    try {
      await api.post('auth/signup', dataUser);
      toast.success('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado!');
      throw error;
    } finally {
      router.push('/');
    }
  };

  const signOut = async () => {
    try {
      router.push('/login');
      storageRemoveToken();
      api.defaults.headers.Authorization = '';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signUp,
        login,
        setLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

import { ReactNode, createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { UserProps } from 'types/user';

interface IUserProvider {
  children: ReactNode;
}

interface IUserContext {
  createUser: (dataUser: UserProps) => void;
  getUsers: () => Promise<UserProps[]>;
  deleteUser: (userId: string) => Promise<void>;
  editUser: (userId: string, updatedData: UserProps) => Promise<void>;
}

const UserContext = createContext({} as IUserContext);

const UserProvider = ({ children }: IUserProvider) => {
  const createUser = async (dataUser: UserProps) => {
    await api.post('auth/signup', dataUser);
    toast.success('Usuário criado com sucesso!');
  };

  const getUsers = async () => {
    try {
      const { data } = await api.get('users');
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteUser = async (userId: string) => {
    await api.delete(`users/${userId}`);
    toast.success('Usuário excluído com sucesso!');
  };

  const editUser = async (userId: string, updatedData: UserProps) => {
    try {
      await api.patch(`users/${userId}`, updatedData);
      toast.success('Usuário alterado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado ao editar o usuário!');
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        getUsers,
        createUser,
        deleteUser,
        editUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

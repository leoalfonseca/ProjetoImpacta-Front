import UsersData from 'pages/admin/users/components/UsersData';
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
  users: UserProps[];
}

const UserContext = createContext({} as IUserContext);

const UserProvider = ({ children }: IUserProvider) => {
  const [users, setUsers] = useState<UserProps[]>(UsersData);

  const createUser = (dataUser: UserProps) => {
    // await api.post('users', dataUser);
    const updatedUsers = [...users, dataUser];
    setUsers(updatedUsers);
    toast.success('Usuário criado com sucesso!');
  };

  const getUsers = () => {
    try {
      // const { data } = await api.get('users');
      // setUsers(data);
      // return data;

      return users;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteUser = (userId: string) => {
    const updatedUsers = users.filter((ind: UserProps) => ind.id !== userId);
    setUsers(updatedUsers);
  };

  const editUser = (userId: string, updatedData: UserProps) => {
    try {
      // await api.patch(`users/${userId}`, updatedData); // Passa os dados a serem atualizados

      const updatedUsers = users.map((ind: UserProps) => {
        if (ind.id === userId) {
          return {
            ...ind,
            ...updatedData,
          };
        }
        return ind;
      });
      setUsers(updatedUsers);
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
        users,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

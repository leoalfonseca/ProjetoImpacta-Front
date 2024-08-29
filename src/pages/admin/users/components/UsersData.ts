import { UserProps } from 'types/user';

const UsersData: UserProps[] = [
  {
    id: crypto.randomUUID(),
    name: 'João Silva',
    email: 'jsilva@corp.com',
    username: 'jsilva',
    status: 'Ativo',
    budget: 24.5,
  },
  {
    id: crypto.randomUUID(),
    name: 'Guilherme Silveira',
    email: 'gsilveira@corp.com',
    username: 'gsilveira',
    status: 'Ativo',
    budget: 12.8,
  },
  {
    id: crypto.randomUUID(),
    name: 'Michael dos Santos',
    email: 'msantos@corp.com',
    username: 'msantos',
    status: 'Inativo',
    budget: 2.4,
  },
];

export default UsersData;

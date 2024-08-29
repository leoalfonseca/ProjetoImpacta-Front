interface PerformerType {
  id: string;
  imgsrc: string;
  name: string;
  post: string;
  pname: string;
  status: string;
  budget: string;
}

const TopPerformerData: PerformerType[] = [
  {
    id: '2',
    imgsrc: '/images/profile/user-2.jpg',
    name: 'João Silva',
    post: 'Gestor de Vendas',
    pname: 'Perfomance de Vendas',
    status: 'Médio',
    budget: '24.5',
  },
  {
    id: '3',
    imgsrc: '/images/profile/user-4.jpg',
    name: 'Guilherme Silveira',
    post: 'Desenvolvedor Web',
    pname: 'Website',
    status: 'Alto',
    budget: '12.8',
  },
  {
    id: '4',
    imgsrc: '/images/profile/user-3.jpg',
    name: 'Michael dos Santos',
    post: 'UI/UX Designer',
    pname: 'Protótipo de Design',
    status: 'Muito Alto',
    budget: '2.4',
  },
];

export default TopPerformerData;

const translateMethodName = (data: string) => {
  switch (data) {
    case 'GET':
      return 'Visualizar';
    case 'POST':
      return 'Cadastrar';
    case 'PATCH':
      return 'Alterar';
    case 'PUT':
      return 'Alterar';
    case 'DELETE':
      return 'Excluir';

    default:
    case 'GET':
      return 'Visualizar';
  }
};

export default translateMethodName;

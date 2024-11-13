import { ReactNode, createContext } from 'react';
import { toast } from 'react-toastify';
import { api } from 'services/api';
import { ProductProps, StockProps } from 'types/product';

interface IUserProvider {
  children: ReactNode;
}

interface IUserContext {
  createProduct: (data: ProductProps) => void;
  getProducts: () => Promise<ProductProps[]>;
  deleteProduct: (id: string) => Promise<void>;
  editProduct: (id: string, updatedData: ProductProps) => Promise<void>;
  changeStock: (id: string, amount: StockProps, type: string) => Promise<void>;
}

const ProductContext = createContext({} as IUserContext);

const ProductProvider = ({ children }: IUserProvider) => {
  const createProduct = async (data: ProductProps) => {
    await api.post('products', data);
    toast.success('Produto criado com sucesso!');
  };

  const getProducts = async () => {
    try {
      const { data } = await api.get('products');
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    await api.delete(`products/${id}`);
    toast.success('Produto excluído com sucesso!');
  };

  const editProduct = async (id: string, updatedData: ProductProps) => {
    try {
      await api.patch(`products/${id}`, updatedData);
      toast.success('Produto alterado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado ao editar o produto!');
      throw error;
    }
  };

  const changeStock = async (id: string, amount: StockProps, type: string) => {
    try {
      await api.patch(`/products/${id}/${type}`, amount);
      toast.success('Estoque atualizado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Algo deu errado ao editar o estoue!');
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        getProducts,
        createProduct,
        deleteProduct,
        editProduct,
        changeStock,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };

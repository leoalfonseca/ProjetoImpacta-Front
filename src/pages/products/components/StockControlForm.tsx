import { Box, FormControl, Grid, TextField } from '@mui/material';
import GenericModal from 'components/genericModal/baseModal';
import { ProductContext } from 'context/ProductContext';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { ProductProps } from 'types/product';
import * as yup from 'yup';

interface IAddStockFormProps {
  open: boolean;
  handleClose: () => void;
  product: ProductProps | null;
  type: string;
}

const AddStockForm = ({
  open,
  handleClose,
  product,
  type,
}: IAddStockFormProps) => {
  const { changeStock } = useContext(ProductContext);

  const schema = yup.object({
    amount: yup
      .number()
      .integer('Por favor insira um número válido.')
      .typeError('Este campo deve ser um número')
      .required('Campo Obrigatório')
  });

  const formik = useFormik({
    initialValues: {
      amount: 0,
      type: type,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        if (product) {
          if (values.amount) values.amount = parseFloat(values?.amount.toString());
          await changeStock(product.id ?? '', values, type);

          formik.resetForm();
          handleCloseAndClear();
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleCloseAndClear = () => {
    handleClose();
    formik.resetForm();
  };

  return (
    <GenericModal
      title={type === 'increase' ? 'Adicionar' : 'Reduzir'}
      handleClose={handleCloseAndClear}
      formikhandleSubmit={formik.handleSubmit}
      isOpen={open}
      width="500px"
    >
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexWrap={'wrap'}
        style={{
          marginTop: '10px',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Quantidade *"
                fullWidth
                id="amount"
                {...formik.getFieldProps('amount')}
                error={Boolean(formik.touched.amount && formik.errors.amount)}
                helperText={formik.touched.amount && formik.errors.amount}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </GenericModal>
  );
};

export default AddStockForm;

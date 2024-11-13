import {
  Autocomplete,
  FormControl,
  Grid,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import GenericModal from 'components/genericModal/baseModal';
import { ProductContext } from 'context/ProductContext';
import { useFormik } from 'formik';
import { useContext } from 'react';
import { ProductProps } from 'types/product';
import OrderListFunction from 'utils/orderList';
import * as yup from 'yup';

interface IRegisterProps {
  open: boolean;
  handleClose: () => void;
  resObj: any;
}

const RegisterForm = ({ open, handleClose, resObj }: IRegisterProps) => {
  const { createProduct } = useContext(ProductContext);

  const schemaUsers = yup.object({
    name: yup.string().required('Campo Obrigatório'),
    description: yup.string().required('Campo Obrigatório'),
    stock: yup
      .number()
      .integer('Por favor insira um número válido.')
      .typeError('Este campo deve ser um número')
      .required('Campo Obrigatório'),
  });

  const initialValues: ProductProps = {
    name: '',
    description: '',
    stock: 0,
    userId: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: schemaUsers,
    onSubmit: (values) => {
      try {
        if (values.stock) values.stock = parseFloat(values?.stock.toString());
        createProduct(values);
      } catch (error) {
        console.log(error);
      } finally {
        handleCloseAndClear();
      }
    },
  });

  const handleCloseAndClear = () => {
    handleClose();
    formik.resetForm();
  };

  return (
    <GenericModal
      handleClose={handleCloseAndClear}
      isOpen={open}
      formikhandleSubmit={formik.handleSubmit}
      title="Produto"
      isLoading={false}
    >
      <Grid container spacing={3} sx={{ marginTop: '10px' }}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Produto *"
              fullWidth
              id="name"
              {...formik.getFieldProps('name')}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            <Typography color="error">
              {formik.touched.name && formik.errors.name}
            </Typography>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              label="Descrição *"
              fullWidth
              id="description"
              {...formik.getFieldProps('description')}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
            />
            <Typography color="error">
              {formik.touched.description && formik.errors.description}
            </Typography>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <Autocomplete
              id="userId"
              options={resObj ? OrderListFunction(resObj?.users, 'name') : []}
              getOptionLabel={(option) => option.name}
              onChange={(event, value) =>
                formik.setFieldValue('userId', value ? value.id : null)
              }
              value={
                resObj
                  ? resObj?.users.find(
                      (s: any) => s.id === formik.values.userId
                    ) || null
                  : null
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Responsável *"
                  variant="outlined"
                  error={formik.touched.userId && Boolean(formik.errors.userId)}
                  helperText={
                    formik.touched.userId &&
                    formik.errors.userId && (
                      <Typography variant="caption" color="error">
                        {formik.errors.userId}
                      </Typography>
                    )
                  }
                />
              )}
              renderOption={(props, item) => (
                <li {...props} key={item.id}>
                  <ListItemText>{item.name}</ListItemText>
                </li>
              )}
              noOptionsText="Nada encontrado!"
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          {' '}
          <FormControl fullWidth>
            <TextField
              label="Estoque Inicial *"
              fullWidth
              id="stock"
              {...formik.getFieldProps('stock')}
              error={formik.touched.stock && Boolean(formik.errors.stock)}
              helperText={formik.touched.stock && formik.errors.stock}
              onChange={(event: any) => {
                const value = event.target.value.replace(',', '.');
                formik.setFieldValue('stock', value);
              }}
            />
          </FormControl>
        </Grid>
      </Grid>
    </GenericModal>
  );
};

export default RegisterForm;

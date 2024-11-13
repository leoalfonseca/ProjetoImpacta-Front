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
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ProductProps } from 'types/product';
import { compareValues } from 'utils/compareValues';
import OrderListFunction from 'utils/orderList';
import * as yup from 'yup';

interface EditUserFormProps {
  open: boolean;
  handleClose: () => void;
  obj: ProductProps | null;
  resObj: any;
}

const EditUserForm = ({
  open,
  handleClose,
  obj,
  resObj,
}: EditUserFormProps) => {
  const { editProduct } = useContext(ProductContext);


  const [initialValues, setInitialValues] = useState({
    id: obj?.id || '',
    name: obj?.name || '',
    stock: obj?.stock || 0,
    userId: obj?.userId || '',
    description: obj?.description || '',
  });

  const schema = yup.object({
    name: yup.string(),
    stock: yup.string(),
    userId: yup.string(),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      if (obj) {


        await editProduct(obj.id ?? '', values);

        formik.resetForm();
        handleCloseAndClear();
      }
    },
  });

  const handleCloseAndClear = () => {
    handleClose();
    formik.resetForm();
  };

  useEffect(() => {
    if (obj) {
      formik.setFieldValue('name', obj?.name);
      formik.setFieldValue('stock', obj?.stock);
      formik.setFieldValue('description', obj?.description);
      formik.setFieldValue('userId', obj?.user?.id);
    }
  }, [obj]);


  return (
    <GenericModal
      isLoading={false}
      handleClose={handleCloseAndClear}
      formikhandleSubmit={formik.handleSubmit}
      isOpen={open}
      title="Editar Usuário"
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
      </Grid>
    </GenericModal>
  );
};

export default EditUserForm;

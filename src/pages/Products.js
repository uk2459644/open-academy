import { useFormik } from 'formik';
import { useState } from 'react';
// material
import { Container, Typography } from '@material-ui/core';
import Stack from '@mui/material/Stack';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
import { useQuery } from '@apollo/client';
//
import PRODUCTS from '../_mocks_/products';
import { GET_COURSES } from '../graphql/course/course.query';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);

  
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  const {loading,data,error}=useQuery(GET_COURSES);

  if(loading){
    return null;
  }
  if(error){
    return `Error! ${error}`;
  }
  console.log(data);

  return (
    <Page title="Dashboard: Courses | Open Academy">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
         Courses
        </Typography>

        {/* <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}

        <ProductList products={data.courses} />
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}

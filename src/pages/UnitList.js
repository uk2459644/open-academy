import { useFormik } from 'formik';
import { useState } from 'react';
import {useParams} from 'react-router-dom';
// material

import { Link as RouterLink} from 'react-router-dom';
// material
import { Box, Button, Card, CircularProgress, Link} from '@material-ui/core';
import { Container, Typography } from '@material-ui/core';
import Stack from '@mui/material/Stack';
// components
import Page from '../components/Page';
import { useQuery } from '@apollo/client';
import ListDataSidebar from '../components/editorjs/ListDataSideBar';
import { GET_COURSE_WITH_UNIT } from '../graphql/course/course.query';
import ShowEditorjsData from '../components/editorjs/ShowEditorjsData';
import { GET_UNITS_BY_COURSE_ID } from '../graphql/unit/unit.query';
//

// ----------------------------------------------------------------------

export default function UnitList() {
  const [openFilter, setOpenFilter] = useState(false);
  const [skiploading,setSkiploading]=useState(false);
  const [units,setUnits]=useState([]);
  const [currentUnit,setCurrentunit]=useState(0);
  const {id}=useParams();
   const {data,error,loading}=useQuery(GET_UNITS_BY_COURSE_ID,{
     variables:{id:id},
     skip:skiploading
   });

  
  const formik = useFormik({
    initialValues: {
      unit: '',
   
    },
    onSubmit: (values) => {
      setOpenFilter(false);
      console.log('filter button submitted.')
      setCurrentunit(values.unit);
      console.log(values.unit);
    }
  });

  const { resetForm, handleSubmit } = formik;

  if(loading){
    return <h2>Loading... Please wait <CircularProgress /></h2>;
  }

  if(error){
    return `Error ${error}`;
  }

  if(data){
    console.log(typeof data.units)
    console.log(data);
    setUnits(data.units)
    setSkiploading(true);
  }

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
   // resetForm();
  };

 



  return (
    <Page title="Units | Open Academy">
      <Container>
      
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
         
        
        
          {
            skiploading && units.length >0 ? (
              <Stack direction="row" justifyContent="space-between" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                  <Link to={`${units[currentUnit].id}`} color="inherit" underline="hover" component={RouterLink}>
         <Button 
          variant="contained"
         >
          <Typography variant="subtitle2" noWrap>
          {units[currentUnit].title}
          </Typography>
          </Button>
        </Link>
         
              <ListDataSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              units={units}
              title='Unit'
            />
             </Stack>
            ):(
              <div>
                No data available
                </div>
            )
          }
           
         
        
        </Stack>
        {
          skiploading && units.length >0 ? (
            <ShowEditorjsData
            contentData={units[currentUnit].content}
            />
          ):(
            <div>
            Sorry No data available.
            </div>
          )
        }

  
        {/* <ProductCartWidget /> */}
      </Container>
    </Page>
  );
}

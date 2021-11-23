import { useFormik } from 'formik';
import { useState } from 'react';
import {useParams} from 'react-router-dom';
import {Link as RouterLink} from 'react-router-dom';
// material

import { Container, Typography ,Button,Link, CircularProgress} from '@material-ui/core';
import Stack from '@mui/material/Stack';
// components
import Page from '../components/Page';
import { useQuery } from '@apollo/client';
import ListDataSidebar from '../components/editorjs/ListDataSideBar';
import { GET_COURSE_WITH_UNIT } from '../graphql/course/course.query';
import ShowEditorjsData from '../components/editorjs/ShowEditorjsData';
import { GET_TOPICS_BY_UNIT } from '../graphql/unit/unit.query';
//

// ----------------------------------------------------------------------

export default function TopicList() {

  const [openFilter, setOpenFilter] = useState(false);
  const [skiploading,setSkiploading]=useState(false);
  const [units,setUnits]=useState([]);
  const [currentUnit,setCurrentunit]=useState(0);
  const {unitId,courseId}=useParams();
   const {data,error,loading}=useQuery(GET_TOPICS_BY_UNIT,{
     variables:{id:unitId},
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
   console.log(typeof data.unit.topics)
  console.log('unit id'+unitId+' and course id '+courseId);
    console.log(data);
    setUnits(data.unit.topics)
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
    <Page title="Topics list | Open Academy">
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
      {units[currentUnit].title} Questions
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
              title='Topic'
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
          skiploading && units.length >0  ? (
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

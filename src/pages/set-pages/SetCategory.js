import React ,{useState} from 'react';
import {useParams} from 'react-router-dom';
import { useFormik } from 'formik';
import { useQuery } from '@apollo/client';
import { GET_SET_CATEGORY } from '../../graphql/set/setcategory.query';
import { Button, CircularProgress, Link, Stack, Typography } from '@material-ui/core';
import Page from '../../components/Page';

import { Link as RouterLink} from 'react-router-dom';
import ListDataSidebar from '../../components/editorjs/ListDataSideBar';
import ShowEditorjsData from '../../components/editorjs/ShowEditorjsData';

export default function SetCategory(){

    const [openFilter, setOpenFilter] = useState(false);
    const [skiploading,setSkiploading]=useState(false);
    const [units,setUnits]=useState([]);
    const [currentUnit,setCurrentunit]=useState(0);
    // const {id}=useParams();

    const {data,error,loading}=useQuery(GET_SET_CATEGORY,{
       
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
       return <h2>Loading... Please wait <CircularProgress /> </h2>;
     }
   
     if(error){
       return `Error ${error}`;
     }
     if(data){
        console.log(typeof data.setCategories)
        console.log(data);
        setUnits(data.setCategories)
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
        <Page title="Sets | Open Academy">
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
          <Typography variant="subtitle2" noWrap gutterBottom>
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
              title='Set Category'
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


        </Page>
    )
}
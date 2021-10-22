import { useFormik } from 'formik';
import { useState } from 'react';
import {useParams} from 'react-router-dom';
// material

import { Container, Typography } from '@material-ui/core';
import Stack from '@mui/material/Stack';
// components
import Page from '../components/Page';
import { useQuery } from '@apollo/client';
import ListDataSidebar from '../components/editorjs/ListDataSideBar';
import ShowEditorjsData from '../components/editorjs/ShowEditorjsData';
import { GET_QUESTIONS_BY_TOPIC_ID } from '../graphql/topic/topic.query';
//

// ----------------------------------------------------------------------

export default function QuestionList() {

  const [openFilter, setOpenFilter] = useState(false);
  const [skiploading,setSkiploading]=useState(false);
  const [units,setUnits]=useState([]);
  const [currentUnit,setCurrentunit]=useState(0);
  const {unitId,courseId,topicId}=useParams();
   const {data,error,loading}=useQuery(GET_QUESTIONS_BY_TOPIC_ID,{
     variables:{id:topicId},
     skip:skiploading
   });

  console.log('from question list course id '+courseId+' topic id '+topicId);
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
    return 'Loading ...';
  }

  if(error){
    return `Error from question list  ${error}`;
  }

  if(data){
   console.log(typeof data.topic.example_questions);
  console.log('unit id'+unitId+' and course id '+courseId);
    console.log(data);
    setUnits(data.topic.example_questions)
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
    <Page title="Topic's Questions | Open Academy">
      <Container>
      
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
         
          
          {
            skiploading && units.length >0 ? ( <ListDataSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              units={units}
              title='Example question'
            />
            ):(
              <div>
                No data available
                </div>
            )
          }
           
         
          </Stack>
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

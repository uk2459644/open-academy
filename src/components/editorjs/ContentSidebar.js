import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { Form, FormikProvider, useFormik } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/cloud-upload';
import roundFilterList from '@iconify/icons-ic/create';
// material
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
  TextField
} from '@material-ui/core';

import Rating from '@mui/material/Rating';
//
import Scrollbar from '../Scrollbar';
import ColorManyPicker from '../ColorManyPicker';
import {useMutation, useQuery} from '@apollo/client';
import { GET_SETS } from '../../graphql/set/sets.query';
import { useState } from 'react';
import { CREATE_SET_QUESTION } from '../../graphql/set/settquestion.query';

// ----------------------------------------------------------------------

export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];

// ----------------------------------------------------------------------

// ListDataSidebar.propTypes = {
//   isOpenFilter: PropTypes.bool,
//   onResetFilter: PropTypes.func,
//   onOpenFilter: PropTypes.func,
//   handleCloseFilter: PropTypes.func,
//   formik: PropTypes.object,
//   units:PropTypes.array,
//   title:PropTypes.string
// };

export default function ContentSidebar({content}) {
    const [openFilter, setOpenFilter] = useState(false);
    const [units,setUnits]=useState([]);
    const [skiploading,setSkiploading]=useState(false);
    const [currentUnit,setCurrentunit]=useState(0);


    const {data,error,loading}=useQuery(GET_SETS,{
        skip:skiploading,
    });

    const [addQuestion,response]=useMutation(CREATE_SET_QUESTION);
    const validationSchema=Yup.object().shape({
    title:Yup.string().required('Title required.'),
    correctOpt:Yup.string().required('Correct option required'),
    });

    const formik=useFormik({
        initialValues: {
            correctOpt:'',
            title:'',
            unit: '',
          },
          validationSchema:validationSchema,
          onSubmit: (values) => {
            setOpenFilter(false);
           // let content=  navigator.clipboard.read();
            console.log('filter button submitted.');
            addQuestion({variables:{title:values.title,correctOpt:values.correctOpt,sett:values.unit,content:content}});
            setCurrentunit(values.unit);
            console.log(values);
          }
    });
     const {errors,touched,resetForm,handleSubmit,handleChange,getFieldProps}=formik;
    if(loading){
        return <h4>Loading... <CircularProgress /></h4>
    }
    if(error){
        return `Error! ${error}`;

    }
    if(data){
        console.log(typeof data.units)
        console.log(data);
        setUnits(data.setts)
        setSkiploading(true);
    }

    if(response.loading){
        return <h4>Submitting <CircularProgress /></h4>
    }
    if(response.error){
        return `Error !${error}`;
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
//  const { values, getFieldProps, handleChange } = formik;

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={handleOpenFilter}
      >
       Create Question
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="right"
            open={openFilter}
            onClose={handleCloseFilter}
            PaperProps={{
              sx: { width: 280, border: 'none', overflow: 'hidden' }
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 1, py: 2 }}
            >
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
              Create question
              </Typography>
              <IconButton onClick={handleCloseFilter}>
                <Icon icon={closeFill} width={20} height={20} />
              </IconButton>
            </Stack>

            <Divider />

            <Scrollbar>
              <Stack spacing={3} sx={{ p: 3 }}>
               
                <div>
                 
                  <TextField
            fullWidth
            //autoComplete="username"
            type="text"
            label="Question title"
            {...getFieldProps('title')}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title}
          />
           
           <TextField
            fullWidth
            //autoComplete="username"
            type="text"
            label="Correct Option"
            {...getFieldProps('correctOpt')}
            error={Boolean(touched.correctOpt && errors.correctOpt)}
            helperText={touched.correctOpt && errors.correctOpt}
          />
                  <RadioGroup
                   {...getFieldProps('unit')}
                  
                   onChange={handleChange}
                   >
                    {units.map((item,index) => (
                      <FormControlLabel
                       key={index} 
                       value={item.id} 
                       control={<Radio />} 
                     //  onChange={onResetFilter}
                       label={item.title} />
                    ))}
                  </RadioGroup>
                </div>
               </Stack>
            </Scrollbar>

            <Box sx={{ p: 3 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={handleResetFilter}
                startIcon={<Icon icon={roundClearAll} />}
              >
              Upload
              </Button>
            </Box>
          </Drawer>
        </Form>
      </FormikProvider>
    </>
  );
}

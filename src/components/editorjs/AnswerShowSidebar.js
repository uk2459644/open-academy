import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
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
  FormControlLabel
} from '@material-ui/core';

import Rating from '@mui/material/Rating';
//
import Scrollbar from '../Scrollbar';
import ColorManyPicker from '../ColorManyPicker';
import { pink } from '@material-ui/core/colors';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];

// ----------------------------------------------------------------------
 AnswerShowSidebar.propTypes = {
  isOpenFilterans: PropTypes.bool,
//  onResetFilterans: PropTypes.func,
  onOpenFilterans: PropTypes.func,
  onCloseFilterans: PropTypes.func,
  formikans: PropTypes.object,
  unitsans:PropTypes.array,
  corrects:PropTypes.array,
  wrongs:PropTypes.array,
  visiteds:PropTypes.array,
  titleans:PropTypes.string
};

export default function AnswerShowSidebar({
  isOpenFilterans,
 
  onOpenFilterans,
  onCloseFilterans,
  formikans,
  unitsans,
  titleans,
  wrongs,
  visiteds,
  corrects
}) {
  const {  getFieldProps, handleChange,handleSubmit } = formikans;
  
  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilterans}
      >
        {titleans}&nbsp;
      </Button>

      <FormikProvider value={formikans}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="bottom"
            open={isOpenFilterans}
            onClose={onCloseFilterans}
            PaperProps={{
              sx: {  border: 'none', overflow: 'hidden' }
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ px: 1, py: 2 }}
            >
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
               {titleans}
              </Typography>
              <IconButton onClick={onCloseFilterans}>
                <Icon icon={closeFill} width={20} height={20} />
              </IconButton>
            </Stack>

            <Divider />

            <Scrollbar>
              <Stack spacing={3} sx={{ p: 3 }}>
               
                <div>
                  {
                    corrects.length > 0 ? (
                       <Typography color="primary" variant='subtitle1' gutterBottom>
                         Correct answers {corrects.length}.
                       </Typography>
                    ):(
                      <Typography variant='subtitle1' gutterBottom>
                        No correct answers.
                      </Typography>
                    )
                  }
                  {
                    wrongs.length >0 ? (
                      <Typography color="secondary" variant='subtitle1' gutterBottom>
                        Wrong answers {wrongs.length}.
                      </Typography>
                    ):(
                      <Typography  variant='subtitle1' gutterBottom>
                        No wrong answers {visiteds.length}.
                      </Typography>
                    )
                  }
                  {
                    visiteds.length >0 ? (
                      <Typography variant='subtitle1' gutterBottom>
                        Not answered {visiteds.length}.
                      </Typography>
                    ):(
                      <Typography  variant='subtitle1' gutterBottom>
                        No not answered.
                      </Typography>
                    )
                  }
                  <Typography variant="subtitle1" gutterBottom>
                 {/* {title} list */}
                  </Typography>
                  <RadioGroup
                   {...getFieldProps('unit')}
                  row={true}
                   onChange={handleChange}
                   >
                    {unitsans.map((item,index) => (
                        
                      <FormControlLabel
                      
                       key={index} 
                       
                       value={index.toString()} 
                       control={<Radio 
                        //checked={item.userOpt !==null ? true : false}
                       />} 
                       onChange={handleSubmit}
                       label={index+1} />
                       
                    ))}
                  </RadioGroup>
                </div>
               </Stack>
            </Scrollbar>
            <Divider />

            {/* <Box sx={{ p: 3 }}>
              <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="outlined"
                onClick={onResetFilter}
                startIcon={<Icon icon={roundClearAll} />}
              >
               Apply
              </Button>
            </Box> */}
          </Drawer>
        </Form>
      </FormikProvider>
    </>
  );
}

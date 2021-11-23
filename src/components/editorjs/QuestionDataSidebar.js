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

// ----------------------------------------------------------------------

export const FILTER_CATEGORY_OPTIONS = ['All', 'Shose', 'Apparel', 'Accessories'];

// ----------------------------------------------------------------------
 QuestionDataSidebar.propTypes = {
  isOpenFilter: PropTypes.bool,
  onResetFilter: PropTypes.func,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  formik: PropTypes.object,
  units:PropTypes.array,
  title:PropTypes.string
};

export default function QuestionDataSidebar({
  isOpenFilter,
  onResetFilter,
  onOpenFilter,
  onCloseFilter,
  formik,
  units,
  title
}) {
  const { values, getFieldProps, handleChange } = formik;

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Icon icon={roundFilterList} />}
        onClick={onOpenFilter}
      >
        {title}s&nbsp;
      </Button>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate>
          <Drawer
            anchor="right"
            open={isOpenFilter}
            onClose={onCloseFilter}
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
               {title}s
              </Typography>
              <IconButton onClick={onCloseFilter}>
                <Icon icon={closeFill} width={20} height={20} />
              </IconButton>
            </Stack>

            <Divider />

            <Scrollbar>
              <Stack spacing={3} sx={{ p: 3 }}>
               
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                 {/* {title} list */}
                  </Typography>
                  <RadioGroup
                   {...getFieldProps('unit')}
                  row={true}
                   onChange={handleChange}
                   >
                    {units.map((item,index) => (
                      <FormControlLabel
                      
                       key={index} 
                       
                       value={index.toString()} 
                       control={<Radio 
                        //checked={item.userOpt !==null ? true : false}
                       />} 
                       onChange={onResetFilter}
                       label={item.id} />
                       
                    ))}
                  </RadioGroup>
                </div>
               </Stack>
            </Scrollbar>

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

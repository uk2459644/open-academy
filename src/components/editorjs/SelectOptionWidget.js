import { Icon } from "@iconify/react";
import shoppingCartFill from "@iconify/icons-eva/shopping-cart-fill";
// material
import { styled } from "@material-ui/core/styles";
import {
  Badge,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@material-ui/core";
import { Form, FormikProvider } from "formik";
import { green, grey, indigo, pink } from "@material-ui/core/colors";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  zIndex: 999,
  right: 2,
  display: "flex",
  flexDirection: "row",
  cursor: "pointer",
  position: "fixed",
  alignItems: "center",
  alignSelf: "center",
  bottom: theme.spacing(2),
  // height: theme.spacing(5),
  margin: theme.spacing(5),

  // padding: theme.spacing(2),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: theme.shape.borderRadiusMd,
  borderBottomLeftRadius: theme.shape.borderRadiusMd,
  borderTopRightRadius: theme.shape.borderRadiusMd,
  borderBottomRightRadius: theme.shape.borderRadiusMd,
  opacity: 0.72,
  transition: theme.transitions.create("opacity"),
  // '&:hover': { opacity: 0.72 }
}));

// ----------------------------------------------------------------------

export default function SelectOptionWidget({ optionFormik, option }) {
  const { getFieldProps, handleChange, handleSubmit, resetForm } = optionFormik;

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };

  return (
    <RootStyle>
      <FormikProvider value={optionFormik}>
        <Form autoComplete="off" noValidate >
          <Stack spacing={3} sx={{ p: 3 }}>
            <RadioGroup
              {...getFieldProps("option")}
              row={true}
              onChange={handleChange}
            >
              {option != null && option === "a" ? (
                <FormControlLabel
                  value="a"
                  checked={true}
                  control={<Radio />}
                  label="a"
                  disabled={false}
                  
                />
              ) : (
                <FormControlLabel
                  value="a"
                  control={<Radio />}
                  label="a"
                  
                />
              )}
              {option != null && option === "b" ? (
                <FormControlLabel
                  value="b"
                  checked={true}
                  control={<Radio />}
                  label="b"
                  
                />
              ) : (
                <FormControlLabel
                  value="b"
                  control={<Radio />}
                  label="b"
                  
                />
              )}

              {option != null && option === "c" ? (
                <FormControlLabel
                  value="c"
                  checked={true}
                  control={<Radio />}
                  label="c"
                  
                />
              ) : (
                <FormControlLabel
                  value="c"
                  control={<Radio />}
                  label="c"
                  
                />
              )}

              {option != null && option === "d" ? (
                <FormControlLabel
                  value="d"
                  checked={true}
                  control={<Radio />}
                  label="d"
                  
                />
              ) : (
                <FormControlLabel
                  value="d"
                  control={<Radio />}
                  label="d"
                  
                />
              )}
            </RadioGroup>
            <RadioGroup
              {...getFieldProps("status")}
              row={true}
              onChange={handleChange}
              // name="controlled-radio-buttons-group"
            >
              <FormControlLabel
                value="pink"
                control={
                  <Radio
                    sx={{
                      color: pink[800],
                      "&.Mui-checked": {
                        color: pink[600],
                      },
                    }}
                  />
                }
                label=""
                
              />
              <FormControlLabel
                value="grey"
                control={
                  <Radio
                    sx={{
                      color: grey[800],
                      "&.Mui-checked": {
                        color: grey[600],
                      },
                    }}
                  />
                }
                label=""
                
              />
              <FormControlLabel
                value="indigo"
                control={
                  <Radio
                    sx={{
                      color: indigo[800],
                      "&.Mui-checked": {
                        color: indigo[600],
                      },
                    }}
                  />
                }
                label=""
                
              />
              <FormControlLabel
                value="green"
                control={
                  <Radio
                    sx={{
                      color: green[800],
                      "&.Mui-checked": {
                        color: green[600],
                      },
                    }}
                  />
                }
                label=""
                
              />
            </RadioGroup>
         
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}

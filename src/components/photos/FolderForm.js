import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { Stack, TextField } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {getDatabase,ref,push,set,onChildAdded,onChildRemoved} from 'firebase/database'
import { app } from "../../firebase";
import React from "react";
import {Link as RouterLink} from 'react-router-dom';
import { useSelector } from "react-redux";


export default function PhotosFolderForm() {
    const auth=getAuth(app);
    const {userid,authenticated}=useSelector((state)=>state.authenar);
    // const [authenticated,setAuthenticated]=React.useState(false);
    // const [userid,setUserid]=React.useState(null);

    // React.useEffect(()=>{

    //   onAuthStateChanged(auth,(user)=>{
    //     if(user){
    //         console.log('user is signed in folder form');
    //         setAuthenticated(true);
    //         setUserid(user.uid);
    //     }else{
    //         // user is signed out
    //         console.log('user is signed out');
    //         setAuthenticated(false);
    //         setUserid(null);
    //   }
    //   });
   
    // },[]);




  const FolderSchema = Yup.object().shape({
    folderName: Yup.string()
      .min(2, "Too short")
      .max(50, "Too long")
      .required("Folder name required."),
  });

  const formik = useFormik({
    initialValues: {
      folderName: "",
    },
    validationSchema: FolderSchema,
    onSubmit: (values) => {
      console.log("form is validated.");
      const db=getDatabase(app);
      const folderRef=ref(db,'photos-folder/'+userid);
     
      const newfolderRef=push(folderRef);
      set(newfolderRef,{
          foldername:values.folderName
      }).then((result)=>{
          console.log(result);
      })
      .catch((error)=>{
          console.log(error);
      });

      window.location.reload();
     
      
    },
  });

  const { errors, handleSubmit, isSubmitting, getFieldProps, touched } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
       <Stack spacing={3}>
          <Stack direction={{ xs: "coloumn", sm: "row" }} spacing={2}>
            <TextField
              label="Folder Name"
              fullWidth
              {...getFieldProps("folderName")}
              error={Boolean(touched.folderName && errors.folderName)}
              helperText={touched.folderName && errors.folderName}
            />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              startIcon={<Icon icon={plusFill}/>}
            >
              Create Folder
            </LoadingButton>
      </Stack>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

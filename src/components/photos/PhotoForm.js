import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button, Card, CardMedia, Stack, TextField, Typography } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import {getStorage,ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import {getDatabase,ref as dbref,push,set} from 'firebase/database';
import { app } from "../../firebase";
import { useSelector } from "react-redux";

export default function PhotoForm({folder}) {
    const storage=getStorage(app);
    const database=getDatabase(app);
    const {userid}=useSelector((state)=>state.authenar);

  const FileSchema = Yup.object().shape({
    fileName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("File name required"),
  });

  const formik = useFormik({
    initialValues: {
      fileName: "",
    },
    validationSchema: FileSchema,
    onSubmit: (values) => {
       const storageRef=ref(storage,'images/'+folder+'/'+userid+'/'+picture.name);

       uploadBytes(storageRef,picture).then((snapshot)=>{
           
           console.log(snapshot.ref.fullPath);
           getDownloadURL(storageRef).then((url)=>{
             let imgdbref= dbref(database,'images/'+folder+'/'+userid);
             let newimgdbref=push(imgdbref);
             set(newimgdbref,{
              fileName:values.fileName,
              img:url
             }).then((result)=>{
               console.log(result);
               window.location.reload();
             }).catch((error)=>{
                 console.log(error);
             });
            console.log(url);
        }).catch((error)=>{
         console.log(error);
        });

       }).catch((error)=>{
           console.log('upload failed. error!'+error);
       });

    
      console.log("submitting file"+storageRef);
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const [picturechoosed,setPicturechoosed]=useState(false);
  const [picture,setPicture]=useState('');

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Typography>
                  Choosen file: - <Typography variant='h4'>{picture.name}</Typography>
                  </Typography>
            <Button 
          
            variant="contained" 
            component="label">
             Select Image Only
              <input type="file" hidden
              onChange={(e)=>{
                setPicture(e.target.files[0]);
                console.log(e.target.files[0])
                setPicturechoosed(true);
              }
               }
              />
            </Button>
          </Stack>
          <TextField
              fullWidth
              label="File name"
              {...getFieldProps("fileName")}
              error={Boolean(touched.fileName && errors.fileName)}
              helperText={touched.fileName && errors.fileName}
             
            />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Upload Image
            </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}

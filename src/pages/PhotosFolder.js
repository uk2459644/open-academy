import { Container, Stack, Button, Typography, Modal } from "@material-ui/core";
import * as React from 'react';
import Page from "../components/Page";
//icons
import plusFill from "@iconify/icons-eva/plus-fill";
import { Icon } from "@iconify/react";
import MenuPopover from "../components/MenuPopover";
import { Box } from "@material-ui/system";
import PhotosFolderForm from "../components/photos/FolderForm";
// firebase stuffs
import {getDatabase,ref,query,limitToLast ,onValue} from 'firebase/database'
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { app } from "../firebase";
import {Link as RouterLink} from 'react-router-dom';
import FolderList from "../components/photos/FolderList";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function PhotosFolder() {
  const {authenticated,userid}=useSelector((state)=>state.authenar);
  // const [authenticated,setAuthenticated]=React.useState(false);
  // const [userid,setUserid]=React.useState(null);
  const [folders,setFolders]=React.useState([]);
  
  // authentication sections

 
/**
 * realtime database sections
 */

useEffect(()=>{

  if(authenticated){
    const db=getDatabase(app);
    const folderRef=ref(db,'photos-folder/'+userid);
    
    // const folders=query(folderRef,limitToLast(100));
    onValue(folderRef, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        let folder={
          key:childKey,
          folderName:childData.foldername,
          userid:userid
        }
  
        setFolders(prevArr=>[...prevArr,folder]);
        console.log(folders);
        console.log(childData);
        // ...
      });
    }, {
      onlyOnce: true
    });
  
    // console.log(folders)
  }
},[]);


  return (
    <Page title="Photos Folder| Open Academy">
      {
        authenticated ? (
          <Container>
        <Stack
          direction={{xs: "coloumn", sm: "row"}}
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          {/* <Typography variant="h4" gutterBottom>
            Photos Folder
          </Typography> */}
          <PhotosFolderForm />
        </Stack>
        <Typography variant="h4" gutterBottom>
            Photos Folder
          </Typography>
          {
            folders.length >0 ? (  <FolderList folders={folders} />):(null)
          }
        
      </Container>
        ) :
        (
          <Container>
          <Stack
            direction={{xs: "coloumn", sm: "row"}}
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
             <Typography variant="h4" gutterBottom>
              You are not authenticated.
            </Typography>
            <Button
            variant='contained'
            component={RouterLink}
            size='large'
            to='/login'
            >
            Login
            </Button>
            {/* <Typography variant="h4" gutterBottom>
              Photos Folder
            </Typography> */}
            {/* <PhotosFolderForm /> */}
          </Stack>
         
        </Container>
        )
      }
    
    </Page>
  );
}

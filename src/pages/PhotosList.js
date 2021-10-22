import { Container, Typography } from "@material-ui/core";
import { useParams } from "react-router";
import Page from "../components/Page";
import { styled } from "@material-ui/core/styles";
import PhotoForm from "../components/photos/PhotoForm";
import SpeedDialTogglePhoto from "../components/photos/SpeedDialTogglePhoto";
import { useEffect, useState } from "react";
import PhotoItemList from "../components/photos/PhotoItemList";

import {getDatabase,ref,onValue} from 'firebase/database';
import {app} from '../firebase'
import { useSelector } from "react-redux";

//---------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  }));

  const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    // minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
  }));

export default function PhotosList(){

    const {id , folder}=useParams();
    const [photolist,setPhotolist]=useState(true);
    const {userid} = useSelector((state)=>state.authenar)

    const togglePhotolist=()=>setPhotolist(!photolist);

    const database=getDatabase(app);
    let imgdbref= ref(database,'images/'+folder+'/'+userid);
    const [photos,setPhotos]=useState([]);
    useEffect(()=>{
      onValue(imgdbref,(snapshot)=>{
           snapshot.forEach((childSnapshot)=>{
              const childKey=childSnapshot.key;
              const childData=childSnapshot.val();

              let photo={
                key:childKey,
                title:childData.fileName,
                img:childData.img
              }
             setPhotos(prevPhotos=>[...prevPhotos,photo]);
              console.log(photo);
              console.log(childData);
           });
      });
    },[]);
    return (
        <RootStyle title="Photos List | Open Academy">
         <SpeedDialTogglePhoto togglePhotolist={togglePhotolist}/>
         <Container>
        
             <ContentStyle>
           
            {
              photolist && photos.length >0 ? (<PhotoItemList photos={photos} />):( <PhotoForm folder={folder}/>)
            }
            
            
             </ContentStyle>
         </Container>
        </RootStyle>
    )
}
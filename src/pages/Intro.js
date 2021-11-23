import { CircularProgress, Container, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import React, { useState } from 'react';
import Page from '../components/Page';

// graphql imports
import {useQuery} from '@apollo/client';
import {GET_INTRO} from '../graphql/single-type/intro.query';
import ShowEditorjsData from '../components/editorjs/ShowEditorjsData';

export default function Intro(){

     const [skiploading,setSkiploading]=useState(false);
     const [contentData,setContentdata]=useState({});
    const {loading,error,data}=useQuery(GET_INTRO,{
        skip:skiploading
    });

    if(loading){
        return <h4>Please wait <CircularProgress /></h4>;
    }

    if(error){
        return `Error ${error}`;
    }

    if(data){
        console.log(data);
        setSkiploading(true);
        setContentdata(data.intro.content);
        console.log(data.intro.content);
    }

    return(
        <Page title="Intro | Open Academy">
            <Container maxWidth="xl">
                
                {
                    skiploading ? (
                        <ShowEditorjsData
                          contentData={contentData}
                        />
                    ):
                    (
                    <Box sx={{pb:5}}>
                        <Typography variant="h4">Something gone wrong. !!</Typography>
                    </Box>
                    )
                }
            </Container>
        </Page>
    )
}
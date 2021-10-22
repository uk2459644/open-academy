import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Card, Link, Container, Typography, Button } from '@material-ui/core';
// layouts

// components
import Page from '../components/Page';

import { useEffect } from 'react';
// math field element
import { MathfieldElement} from 'mathlive';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
// marginTop:'16px',
  display: 'flex',
//   minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function FormulaEditor() {

   
    const mfe  =new MathfieldElement({
     virtualKeyboardMode:'manual'
    })
    mfe.value = 'x=\\frac{\\pi}{2}';

    useEffect(()=>{
        let div=document.getElementById('guppy');
        div.appendChild(mfe);


    },[]);


  return (
    <RootStyle title="Formula editor | Open Academy">
        
        <Container>
        
          
        <div id="guppy" 
        sx={{
            padding:'4px'
        }}>

            </div>
           
            <ContentStyle>
            <LoadingButton 
                fullWidth
                size="large"
                type="submit"
                variant="contained"

                onClick={()=>{navigator.clipboard.writeText(mfe.getValue())}}
                >
                  Copy Formula
              </LoadingButton>
            </ContentStyle>
           
            </Container>
    </RootStyle>
  );
}

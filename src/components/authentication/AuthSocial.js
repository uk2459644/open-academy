import { Icon } from '@iconify/react';
import googleFill from '@iconify/icons-eva/google-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
// material
import { Stack, Button, Divider, Typography } from '@material-ui/core';

// import from firebase 
import {getAuth,GoogleAuthProvider,FacebookAuthProvider,signInWithPopup} from 'firebase/auth';
import { app } from '../../firebase';
import { useNavigate } from 'react-router';
// ----------------------------------------------------------------------

const auth = getAuth(app);
const googleProvider=new GoogleAuthProvider();
const facebookProvider=new FacebookAuthProvider();


export default function AuthSocial() {
  const navigate = useNavigate();
 
  const googleAuth= () => {
    signInWithPopup(auth,googleProvider)
    .then(result=>{
      console.log(result);
      navigate('/dashboard/courses',{replace:true});
    })
    .catch(error=>{
     console.log(error);
    });
  }
  const facebookAuth = ()=>{
    signInWithPopup(auth,facebookProvider)
    .then(result=>{
      console.log(result);
      navigate('/dashboard/courses',{replace:true});
    })
    .catch(error=>{
     console.log(error);
    });
  }
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={googleAuth}>
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined" onClick={facebookAuth} >
          <Icon icon={facebookFill} color="#1877F2" height={24} />
        </Button>

        <Button fullWidth size="large" color="inherit" variant="outlined">
          <Icon icon={twitterFill} color="#1C9CEA" height={24} />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         Enjoy--twitter auth will be added soon.
        </Typography>
      </Divider>
    </>
  );
}

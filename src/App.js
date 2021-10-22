// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { app } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { authOFF, authON } from './hooks/slices/AuthSlice';

// ----------------------------------------------------------------------

export default function App() {

  const dispatch=useDispatch();

 
  const auth=getAuth(app);

  onAuthStateChanged(auth,(user)=>{
   if(user){
     console.log('user is signed in App.js');
   dispatch(authON({
     userid:user.uid,
     displayName:user.displayName,
     photoURL:user.photoURL,
   }));

  
   }else{
     console.log('user has signed out in App.js');
     dispatch(authOFF());
   }
  });


  
  return (
    <ThemeConfig>
      <ScrollToTop />
      <Router />
    </ThemeConfig>
  );
}

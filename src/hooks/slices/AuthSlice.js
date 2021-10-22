import { createSlice } from "@reduxjs/toolkit";

// export const initialState={
//     authenticated:false,
//     userid:null,
//     displayName:null,
//     photoURL:null
// }

const authSlice=createSlice({
    name:'authenar',
    initialState:{
        authenticated:false,
        userid:null,
        displayName:null,
        photoURL:null
    },
    reducers:{
      authON:(state,action)=>{
      state.authenticated=true;
      state.displayName = action.payload.displayName;
      state.userid = action.payload.userid;
      state.photoURL = action.payload.photoURL;
      },
      authOFF:(state)=>{
          state.authenticated=false;
          state.displayName=null;
          state.photoURL=null;
          state.userid=null;
      }

    },
});

export const {authON,authOFF}=authSlice.actions
export default authSlice.reducer
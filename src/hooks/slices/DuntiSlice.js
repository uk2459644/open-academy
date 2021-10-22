import { createSlice } from "@reduxjs/toolkit";

const dunitSlice=createSlice({
    name:'dunit',
    initialState:{
        content:null,
        dataid:null,
        draft:false,
        newdata:false,
        reducerloaded:false
    },
    reducers:{
        dunitON:(state,action)=>{
            state.newdata=true;
            state.dataid=action.payload.id;
            state.draft=action.payload.draft;
            state.content=action.payload.content;
            state.reducerloaded=true;
        },
        dunitOFF:(state)=>{
            state.content=null;
            state.dataid=null;
            state.newdata=false;
            state.draft=false;
        },
        dunitRLON:(state)=>{
            state.reducerloaded=false;
        }
    }

});

export const {dunitON,dunitOFF,dunitRLON}=dunitSlice.actions
export default dunitSlice.reducer
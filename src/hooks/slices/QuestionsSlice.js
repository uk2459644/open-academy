import { createSlice } from "@reduxjs/toolkit";

const questionSlice=createSlice({
 name:'questionslice',
 initialState:{
   questionlist:[],
   currentUnit:0,
   loadingQuestion:false,
   submittingOption:false
 },
 reducers:{
     initiateQuestions:(state,action)=>{
      state.questionlist=action.payload.questionlist;
      state.loadingQuestion=true;
     },
     incrementUnit:(state)=>{
     state.currentUnit+=1;
     console.log(state.currentUnit);
     },
     decrementUnit:(state)=>{
     state.currentUnit-=1;
     console.log(state.currentUnit);
     },
     updateCurentUnit:(state,action)=>{
      state.currentUnit=action.payload.currentUnit;
     },
     updateQuestion:(state,action)=>{
      console.log(action.payload.currentUnit);
      state.submittingOption=true;
  
      let newunits=[...state.questionlist];
      let newunit=newunits[action.payload.currentUnit];
      console.log(newunit);
      let newunitcontent={...newunit.content};
      console.log(newunitcontent);
     
      let blocks=[...newunitcontent.blocks];
   
      console.log(blocks);
   
     let changeitem=blocks[action.payload.index];
   
     console.log(changeitem);
   
      let changeditem={
        ...changeitem,
        data:{
          ...changeitem.data,
          selected:action.payload.option
        }
      };
      console.log(changeditem);
      blocks[action.payload.index]=changeditem;
      console.log(blocks);
      let changedunitcontent={
        ...newunitcontent,
        blocks:blocks,
      };
   
      console.log(changedunitcontent);
      newunits[action.payload.currentUnit]={...newunit,content:{...changedunitcontent}};
   
      console.log(newunits);
      state.questionlist=[...newunits];
    // setUnits([...units,changedunitcontent]);
     // setUnits(newunits);
      console.log(state.questionlist);
      state.submittingOption=false;
     }
    
 },

});

export const {initiateQuestions,updateQuestion,updateCurentUnit,incrementUnit,decrementUnit}=questionSlice.actions;
export default questionSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/AuthSlice'
import dunitReducer from './slices/DuntiSlice'
import QuestionsSlice from "./slices/QuestionsSlice";

export default  configureStore({
    reducer:{
        authenar:authReducer,
        dunit:dunitReducer,
        questionslice:QuestionsSlice,
    }
});
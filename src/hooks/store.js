import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/AuthSlice'
import dunitReducer from './slices/DuntiSlice'

export default  configureStore({
    reducer:{
        authenar:authReducer,
        dunit:dunitReducer,
    }
});
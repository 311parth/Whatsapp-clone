import {configureStore} from "@reduxjs/toolkit";
import  activeChatIdSlice  from "./activeChatIdSlice";
const store = configureStore({
    reducer:{
        activeChatIdSlice : activeChatIdSlice
    }
})

export default store;
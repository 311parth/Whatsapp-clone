import {configureStore} from "@reduxjs/toolkit";
import  activeChatIdSlice  from "./activeChatIdSlice";
import usernameSlice from "./usernameSlice";
import contactsSlice from "./contactsSlice"
const store = configureStore({
    reducer:{
        activeChatIdSlice : activeChatIdSlice,
        usernameSlice : usernameSlice,
        contactsSlice : contactsSlice
    }
})

export default store;
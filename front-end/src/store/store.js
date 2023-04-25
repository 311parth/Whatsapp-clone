import {configureStore} from "@reduxjs/toolkit";
import  activeChatIdSlice  from "./activeChatIdSlice";
import usernameSlice from "./usernameSlice";
import contactsSlice from "./contactsSlice";
import socketRoomSlice from "./socketRoomSlice";
import unreadNewMsg from "./unreadNewMsg"
import visitedContacts from "./visitedContacts"

const store = configureStore({
    reducer:{
        activeChatIdSlice : activeChatIdSlice,
        usernameSlice : usernameSlice,
        contactsSlice : contactsSlice,
        socketRoomSlice:socketRoomSlice,
        unreadNewMsg : unreadNewMsg,
        visitedContacts : visitedContacts
    },
})

export default store;
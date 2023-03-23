import {createSlice} from "@reduxjs/toolkit"

export const contactsSlice = createSlice({
    name:"contactsSlice",
    initialState:{
        contacts : [],
    },
    reducers:{
        setContact(state,action){
            state.contacts =(action.payload.contacts);
        },
        pushContact(state,action){
            state.contacts.push(action.payload);
        }
    }
})

export const {setContact,pushContact}  = contactsSlice.actions;

export default contactsSlice.reducer;
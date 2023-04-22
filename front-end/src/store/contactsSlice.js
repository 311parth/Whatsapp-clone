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
            // state.contacts.push(action.payload);
            const contactIndex = state.contacts.findIndex((contact) => contact.userid === action.payload.userid);
            if (contactIndex === -1) {
            // contact not found, add it
            state.contacts.push(action.payload);
            } else {
            // contact found, update it
            state.contacts[contactIndex] = action.payload;
            }
        }
        
    }
})

export const {setContact,pushContact}  = contactsSlice.actions;

export default contactsSlice.reducer;
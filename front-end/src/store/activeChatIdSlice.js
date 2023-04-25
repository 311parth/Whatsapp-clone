import {createSlice} from "@reduxjs/toolkit"

export const activeChatIdSlice = createSlice({
    name:"activeChatIdSlice",
    initialState:{
        id:0,
        username: "",
    },
    reducers:{
        setActiveChatId(state,action){
            state.id=action.payload.id;
            state.username=action.payload.username;
        },
    }
})

export const {setActiveChatId,setVisited}  = activeChatIdSlice.actions;

export default activeChatIdSlice.reducer;
import {createSlice} from "@reduxjs/toolkit"

export const socketRoomSlice = createSlice({
    name:"socketRoomSlice",
    initialState:{
        id:0,
    },
    reducers:{
        setSocketRoom(state,action){
            state.id=action.payload.id;
        },
    },
})

export const {setSocketRoom}  = socketRoomSlice.actions;

export default socketRoomSlice.reducer;
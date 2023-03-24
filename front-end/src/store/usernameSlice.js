import {createSlice} from "@reduxjs/toolkit"

export const usernameSlice = createSlice({
    name:"usernameSlice",
    initialState:{
        username: "",
        userid:"",
    },
    reducers:{
        setUsername(state,action){
            state.username=action.payload.username;
            state.userid=action.payload.userid
        },
    }
})

export const {setUsername}  = usernameSlice.actions;

export default usernameSlice.reducer;
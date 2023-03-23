import {createSlice} from "@reduxjs/toolkit"

export const usernameSlice = createSlice({
    name:"usernameSlice",
    initialState:{
        username: "",
    },
    reducers:{
        setUsername(state,action){
            state.username=action.payload.username;
        },
    }
})

export const {setUsername}  = usernameSlice.actions;

export default usernameSlice.reducer;
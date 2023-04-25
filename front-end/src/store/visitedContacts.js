import {createSlice} from "@reduxjs/toolkit"

export const visitedContactSlice = createSlice({
    name:"visitedContactSlice",
    initialState:[],
    reducers:{
        setVisited(state,action){
            if(!state.includes(action.payload.userid)){
                state.push(action.payload.userid);
            }
        },
    }
})

export const {setVisited}  = visitedContactSlice.actions;

export default visitedContactSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

export const unreadNewMsg = createSlice({
  name: 'unreadNewMsg',
  initialState: [],
  reducers: {
    setUnreadNewMsg(state, action) {
      const { sender, isLeft, msg } = action.payload;
      const existingObj = state.find(obj => obj.sender === sender);

      if (existingObj) {
        existingObj.msg.push(msg);
      } else {
        const newObj = {
          sender,
          isLeft: 1,
          msg: [msg],
        };
        state.push(newObj);
      }
    },
  },
});

export const { setUnreadNewMsg } = unreadNewMsg.actions;

export default unreadNewMsg.reducer;

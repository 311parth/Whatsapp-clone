import { pushContact } from "../store/contactsSlice";

export function newMsgRec(socket, dispatch, onMsgRec,username) {
  socket.on("msgRec", (args) => {
    // console.log("msgRec", args);
    onMsgRec(args)//callback to return args
    if (!args.isSenderIsSavedInRecSide) {
      console.log("hh");
      if (args.sender && args.email && args.userid && args.userid !== username.userid) {
        dispatch(
          pushContact({
            username: args.sender,
            email: args.email,
            userid: args.userid,
            saved: 0,
          })
        );
      }
    }
  });
}

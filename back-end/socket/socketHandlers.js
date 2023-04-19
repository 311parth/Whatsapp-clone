const  {loginModel} = require("../model/loginModel")
const  {contactModel} = require("../model/contactModel")



const socketHandlers = (io) => {
    
  io.on('connection',async (socket) => { 
    const roomId = socket.handshake.query.roomId;
    // console.log(roomId)
    if (io.sockets.adapter.rooms.has(roomId)) {
      socket.join(roomId);
    }else{
      io.sockets.adapter.rooms.set(roomId, new Set());
      socket.join(roomId);
      socket.emit('roomACK', roomId);
      // console.log("room not empty")
    }
    // socket.join(roomId); 
    socket.emit('roomACK', roomId);
    try {
      socket.on('newMsg',async(args)=>{
        console.log("new",args)
        var senderUsername="";
        var isSenderIsSavedInRecSide =false;
        //checking if the user is alredy in cantact of sender 
        const contactResponse = await contactModel.findOne({uuid:args.recRoomId});

          //checking if the rec have saved contact of sender
          var contactMatched= contactResponse.contacts.find(ele=>ele.userid===args.senderid);
          if(contactMatched){
            senderUsername = contactMatched.username;//adding sender username with msg
            isSenderIsSavedInRecSide=true;
          }else{
            //sender username is unknown to rec so..
            //fetching username of sender with senderid
            const senderUserResponse = await loginModel.findOne({uuid:args.senderid});
            if(senderUserResponse && senderUserResponse.username){
              senderUsername=senderUserResponse.username;
            }
            //addding sender to contact list of recv with saved flag as 0
            contactResponse.contacts.push({
              username: senderUserResponse.username,
              email : senderUserResponse.email,
              userid:senderUserResponse.uuid,
              saved: 0
            })
            await contactResponse.save();
            isSenderIsSavedInRecSide=false;
          };

        //sedning msg to room 
        io.to(args.recRoomId).to(args.senderid).emit('msgRec', {body : args.msgBody,sender : senderUsername,isSenderIsSavedInRecSide : isSenderIsSavedInRecSide});
          

        /*
          from : a 0
          to : b 1
          msg : hi 
          store the msg
          send msg  to b
          send ack to a
        */
      });
    } catch (error) {
      console.log(error)
    }

    socket.on('disconnect', () => {
      // console.log('A client disconnected',socket.id);
    });

  });
  }
  
module.exports = socketHandlers;
  
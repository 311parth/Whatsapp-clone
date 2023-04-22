const  {loginModel} = require("../model/loginModel")
const  {contactModel} = require("../model/contactModel")
const {messagesModel} = require("../model/messagesModel");


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
        
        /*args format
        {
          msgBody: msg body
          senderid: sender userid
          recRoomId: recv useid
        }
        */
        // console.log("new",args)
        var senderUsername="";
        var isSenderIsSavedInRecSide =false;
        //checking if the user is alredy in cantact of sender 
        const contactResponse = await contactModel.findOne({uuid:args.recRoomId});
        var senderUserResponse;
          //checking if the rec have saved contact of sender
          var contactMatched= contactResponse.contacts.find(ele=>ele.userid===args.senderid);
          if(contactMatched){
            senderUsername = contactMatched.username;//adding sender username with msg
            isSenderIsSavedInRecSide=true;
          }else{
            //sender username is unknown to rec so..
            //fetching username of sender with senderid
            senderUserResponse = await loginModel.findOne({uuid:args.senderid});
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
        //storing to mongodb
        const newMessage = await new messagesModel({
          sharedId : args.recRoomId>args.senderid ? args.recRoomId.concat(args.senderid) : args.senderid.concat(args.recRoomId),
          msgBody : args.msgBody,
          senderId : args.senderid,
        }).save();

        //sedning msg to room 
        if(!isSenderIsSavedInRecSide){
          // io.to(args.recRoomId).to(args.senderid).emit('msgRec', {body : args.msgBody,sender : senderUsername,email:senderUserResponse.email,userid:senderUserResponse.uuid,isSenderIsSavedInRecSide : isSenderIsSavedInRecSide});
          io.to(args.recRoomId).emit('msgRec', {body : args.msgBody,sender : senderUsername,email:senderUserResponse.email,userid:senderUserResponse.uuid,isSenderIsSavedInRecSide : isSenderIsSavedInRecSide,recvId : args.recRoomId});
        }else{
          io.to(args.recRoomId).emit('msgRec', {body : args.msgBody,sender : senderUsername,isSenderIsSavedInRecSide : isSenderIsSavedInRecSide,recvId : args.recRoomId});
        }
        io.to(args.senderid).emit('msgSendACK', {ACK:1});
          

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
  
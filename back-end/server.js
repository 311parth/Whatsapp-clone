const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var cookieParser = require("cookie-parser");
app.use(cookieParser());
const path = require("path")
const dotenv = require("dotenv");
dotenv.config({path:path.resolve(__dirname,"../.env") });


const { conn } = require("./db/db");

var cors = require("cors");
app.use(cors({
    origin: "*"
}));
const port = process.env.PORT || 8080;

const io = require("socket.io")(server,{
    cors:{
        origin:`${process.env.CLIENT_URL}`
        // origin: `http://localhost:3000`
    },
})





const  {loginModel} = require("./model/loginModel")

const testRoute = require("./routes/test");
const signupRoute = require("./routes/signup")
const loginRoute = require("./routes/login")
const contactRoute = require("./routes/contact")

app.use("/api/v1/test",testRoute);
app.use("/api/v1/signup",signupRoute)
app.use("/api/v1/login",loginRoute)
app.use("/api/v1/contact",contactRoute)

  io.on('connection', (socket) => { 
    console.log('A new client connected',socket.id);
    // const socketId = "test123";
    // socket.join(socketId);
    // socket.emit('roomACK', socketId);
    const roomId = socket.handshake.query.roomId;
    console.log(roomId)
    if (io.sockets.adapter.rooms.has(roomId)) {
      socket.join(roomId);
    }else{
      io.sockets.adapter.rooms.set(roomId, new Set());
      socket.join(roomId);
      socket.emit('roomACK', roomId);
      console.log("room not empty")
    }
    // socket.join(roomId); 
    socket.emit('roomACK', roomId);
    socket.on('new',(args)=>{
      // console.log(io.sockets.adapter.rooms,typeof(io.sockets.adapter.rooms)); 
      // console.log("\n")
      // io.sockets.adapter.rooms.forEach((element,i) => {
      //   console.log(i,element)
      // });
      // console.log("new",args)
      io.to(args.recRoomId).to(args.senderid).emit('msgRec', args.msgBody);
      


      /*
        from : a 0
        to : b 1
        msg : hi 
        store the msg
        send msg  to b
        send ack to a
      */
    });

    socket.on('disconnect', () => {
      console.log('A client disconnected',socket.id);
    });

  });
server.listen(port,()=>{
    console.log("server is running on port ",port)
})
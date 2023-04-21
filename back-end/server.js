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
    // origin:"*"
    origin:`${process.env.CLIENT_URL}`
    // origin: `http://localhost:3000`
  },
})

const socketHandlers = require("./socket/socketHandlers")
socketHandlers(io);

const testRoute = require("./routes/test");
const signupRoute = require("./routes/signup")
const loginRoute = require("./routes/login")
const contactRoute = require("./routes/contact")

app.use("/api/v1/test",testRoute);
app.use("/api/v1/signup",signupRoute)
app.use("/api/v1/login",loginRoute)
app.use("/api/v1/contact",contactRoute)

server.listen(port,()=>{
    console.log("server is running on port ",port)
})
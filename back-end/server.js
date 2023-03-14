const express = require("express");
const app = express();

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
const  {loginModel} = require("./model/loginModel")

const testRoute = require("./routes/test");
const signupRoute = require("./routes/signup")
const loginRoute = require("./routes/login")
const contactRoute = require("./routes/contact")

app.use("/api/v1/test",testRoute);
app.use("/api/v1/signup",signupRoute)
app.use("/api/v1/login",loginRoute)
app.use("/api/v1/contact",contactRoute)


app.listen(port,()=>{
    console.log("server is running on port ",port)
})
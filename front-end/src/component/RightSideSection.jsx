import React,{useEffect,useRef,useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import MessageBox from './MessageBox';
import { useNavigate } from "react-router-dom";
import { setActiveChatId } from '../store/activeChatIdSlice';
import {  setVisited} from '../store/visitedContacts';

import { io } from "socket.io-client";  
import {pushContact} from "../store/contactsSlice"
import {newMsgRec} from "../helper/socketHanlders.js";
import axios from 'axios';

function RightSideSection(props) {
    const [socket,setSocket] = useState(0);
    const username = useSelector((state)=>state.usernameSlice);
    const activeChatIdSlice = useSelector((state)=>state.activeChatIdSlice);
    const visitedContacts = useSelector((state)=>state.visitedContacts);
    const [messages, setMessages] = useState([]);
    var unreadNewMsg = useSelector((state)=>state.unreadNewMsg);

    
    function onMsgRec(args){
        console.log(6,args);
        const newMessage = {
            msgId: messages.length + 1,
            isLeft:1,
            msgBody: args.body,
            sender : args.sender,
            recvId : args.recvId,
            time: args.time
          };
          console.log(7,newMessage)
          setMessages((prevMsg)=> [...prevMsg, newMessage]);
    };
    useEffect(() => {
        //fetching messages from server
        // console.log(username,activeChatIdSlice);
        if(!username || !activeChatIdSlice || activeChatIdSlice.id===-1 || activeChatIdSlice.id===0)return;
        if(visitedContacts.includes(activeChatIdSlice.id))return;
        dispatch(setVisited({userid: activeChatIdSlice.id}));
        console.log("fetch start")

        axios({
            method: "POST",
            url: "/api/v1/messages",
            data: {
                loggedUserid: username.userid,
                activeChatUserid : activeChatIdSlice.id,
            },
            withCredentials: true,
            headers:{
                Authorization : sessionStorage.getItem("secret")
            }
        }).then((response) => {
            console.log("msg",response.data);
            
            if(response && response.data && response.data.messagesQueryRes){
                const responseMsgArr = response.data.messagesQueryRes;

                const newResponseMessageArr = responseMsgArr.map((ele, index) => ({
                  msgId: messages.length + 1 + index,
                  isLeft: ele.senderId === username.userid ? 0 : 1,
                  msgBody: ele.msgBody,
                  sender: ele.senderId === username.userid ? username.username : activeChatIdSlice.username,
                  recvId: ele.senderId === username.userid ? activeChatIdSlice.id : username.userid,
                  time: ele.time
                }));
              
                newResponseMessageArr.sort((a, b) => new Date(a.time) - new Date(b.time));
              
                setMessages(prevMsg => [...prevMsg, ...newResponseMessageArr]);
            }
        });
        return () => {
        }
    }, [activeChatIdSlice.id])
    console.log(messages);
    useEffect(() => {
        if(username && username.userid ){
            console.log(unreadNewMsg);
            if(unreadNewMsg){
                var tempNewMsg = [];
                for (let msgObj of unreadNewMsg){
                    let msg = msgObj.msg; // get the msg array from the message object
                    for (let i = 0; i < msg.length; i++) {
                        let tempObj = {
                        sender: msgObj.sender,
                        isLeft: msgObj.isLeft,
                        msgBody: msg[i],
                        recvId: msgObj.recvId,
                        time : msgObj.time
                        };
                        tempNewMsg.push(tempObj);
                    }
                }
                setMessages((prevMsg)=>[...prevMsg,...tempNewMsg]);
                console.log(tempNewMsg);
            }
            const tempSocket  = io("http://localhost:8080/",{
                reconnection : true,
                query : {
                    roomId : username.userid
                }
            });
            setSocket(tempSocket);//to use socket outside of this useeffect -> socket
            //and for inside -> tempSocket
            tempSocket.on("connect",()=>{
                console.log(tempSocket.id)
            }) 
            tempSocket.on("roomACK",()=>{
                console.log(tempSocket.id)
                // console.log(tempSocket.rooms,socket)
            }) 
            newMsgRec(tempSocket,dispatch,onMsgRec,username);
            return () => {
                tempSocket.disconnect();
            }
        }

    },[username])

    //temp
    // const socket = props.socket;
    // console.log(props)
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    var activeChatId = useSelector((state)=>state.activeChatIdSlice);
    var usernameSlice = useSelector((state)=>state.usernameSlice);
    var socketRoomSlice = useSelector((state)=>state.socketRoomSlice);


    
    // useEffect(() => {
    //     console.log("RightSideSection :  ",activeChatId)
    // }, [])
    var isDefault =0;
    if(activeChatId.id===-1){
        isDefault=1;
    }
    function navigateBack() {
        dispatch(setActiveChatId({id:-1,username:""}))
        navigate(-1)
    }
    const msgInput = useRef(0);
    var msgInputBody;
    function submitMsg(){
            msgInputBody =msgInput.current.value; 
            console.log("submitting msg",msgInputBody)
            socket.emit("newMsg",{msgBody: msgInputBody,senderid :usernameSlice.userid ,recRoomId : activeChatIdSlice.id})
            socket.on('msgSendACK', (args) =>{
                console.log("1")
                if(args.ACK===1){
                    const newMessage = {
                        msgId: messages.length + 1,
                        isLeft:0,
                        msgBody:  msgInputBody,
                        sender : username.username,
                        recvId : activeChatIdSlice.id,
                        time : args.time
                      };
                    setMessages((prevMsg)=> [...prevMsg, newMessage]);
                }
            });
            document.getElementsByClassName("msgInput")[0].value="";
           
    }
    socket && socket.on('msgSendACK', (args) =>{
        console.log("1")
        if(args.ACK===1){
            const newMessage = {
                msgId: messages.length + 1,
                isLeft:0,
                msgBody:  msgInputBody,
                sender:username.username,
                recvId : activeChatIdSlice.id,
                time : args.time
              };
            setMessages((prevMsg)=> [...prevMsg, newMessage]);
        }
    });
    socket && socket.off('msgSendACK') //removing event listener if ack is recieved (its called more than one time beacuse of the use effect so to stop that)
    function getDefaultRightContainer() {
        return(
            <div className="rightSideDefaultContainer  flex flex-col h-full justify-center items-center  text-primary-dark-gray">
                    <span className="text-3xl text-black font-Helvetica-light" >Chat Messaging App</span>
                    <p className="pt-1 font-Helvetica text-sm " >Send and receive messages without keeping your phone online.</p>
                </div>
        )
    }
    function getChatRightContainer() {
        return(
            <div className="rightSideChatContainer  bg-slate-200  h-full w-full  ">
                <div className="topChatNav space-x-2 h-16  w-full bg-primary-light-gray flex  items-center pl-4 cursor-pointer">
                    {window.innerWidth<=700 ? 
                    <i className="material-icons  text-primary-dark-gray  IconSize-lg   hover:text-primary-green" onClick={navigateBack}>arrow_back</i>
                    : " "}
                    <img src="/placeholder200_200.svg" className="w-10 h-10 rounded-full "/>
                    <div className="chatNavNameSection flex flex-col space-y-0.5 pl-2  w-full py-2 ">
                        <span className="chatUserName text-myMd ">{activeChatId.username} : {activeChatId.id}</span>
                        <span className="chatUserStatus text-xs text-primary-dark-gray">Online</span>
                    </div>
                    <div className="text-primary-dark-gray  ">
                        <ul className="flex pr-6">
                            <i  className="material-icons mx-4 hover:text-primary-green">search</i>
                            <i  className="material-icons mx-4 hover:text-primary-green">more_vert</i>
                        </ul>
                    </div>
                </div>
                <div className="chatContainer h-vh89 pt-2">
                    <div style={{height:"92%"}} className="chatMainContainer overflow-y-scroll scrollbar w-full px-3" >
                        {/* {console.log(activeChatIdSlice.username,messages)} */}
                        {/* {console.log(messages)} */}
                         {messages.map((message,ind) =>
                         //checking if rec is user (if so then checking active chat is of sender )  OR checking if sender is curr user (if so then checking rec window is currently active)
                         ((message.recvId===username.userid && message.sender===activeChatIdSlice.username )||(message.sender===username.username && message.recvId===activeChatIdSlice.id) )? 
                         <MessageBox
                         key={ind}
                            msgId={message.msgId}
                            isLeft={message.isLeft===1 ?  1 :0}
                            msgBody={message.msgBody} 
                            time={message.time}
                            /> : ""
                        )}
                       

                    </div>
                    <div style={{height:"8%"}} className=" chatInputContainer w-full h-16 bottom-0 flex bg-primary-light-gray justify-center items-center space-x-2 " >
                        <input className="msgInput w-10/12 h-10 p-2 text-md rounded-full text-primary-dark-gray" type="text" name="" id="" placeholder="Type a message" ref={msgInput}/>
                        <button  className="w-11 h-10 px-2 pt-2  rounded-full text-primary-dark-gray   hover:text-primary-light-gray hover:bg-primary-green  focus:text-primary-light-gray focus:bg-primary-green" onClick={submitMsg}><i className="material-icons  ">send</i></button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="commonContainer bg-primary-light-gray h-full border-b-green-500 border-b-8 ">
                {/* for default right side home page */}
                {isDefault ? getDefaultRightContainer() : "" }

                {/* for chat right side home page */}
                {!isDefault ? getChatRightContainer() : "" }
            </div>
        </>
    )
}

export default RightSideSection

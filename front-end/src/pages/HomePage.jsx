import React,{useState,useEffect} from 'react'
import LeftSideSection from '../component/LeftSideSection'
import Navbar from '../component/Navbar'
import RightSideSection from '../component/RightSideSection'
import { Provider } from 'react-redux';
import store from "../store/store"
import {useDispatch,useSelector} from "react-redux"
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import { setContact } from '../store/contactsSlice';
import { setActiveChatId } from '../store/activeChatIdSlice';
import {setUsername} from  "../store/usernameSlice.js"
import {setSocketRoom} from  "../store/socketRoomSlice"
import {pushContact} from "../store/contactsSlice"
import {newMsgRec} from "../helper/socketHanlders"
import {setUnreadNewMsg} from "../store/unreadNewMsg"

function HomePage() {
    const activeChatId = useSelector((state)=>state.activeChatIdSlice);
    const usernameSlice = useSelector((state)=>state.usernameSlice);


    // console.log("Homepage :  ",activeChatId)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector((state)=>state.usernameSlice);
    // console.log(username)
    var [innerW,setInnerW] = useState();
    innerW =window.innerWidth;
    function saveUnreadNewMsg(args){
        console.log(6,args);
        const newMessage = {
            // msgId: messages.length + 1,
            sender : args.sender,
            isLeft:1,
            msg: args.body,
            sender : args.sender,
            recvId : args.recvId
          };
        //setMessages((prevMsg)=> [...prevMsg, newMessage]);
        dispatch(setUnreadNewMsg(newMessage));
    };
        const [socket,setSocket] = useState(0);
        const activeChatIdSlice = useSelector((state)=>state.activeChatIdSlice);
        useEffect( () => {
            if(username && username.userid && innerW<=700){//if small screen then only start new sokcet (because its in new url)
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
                    newMsgRec(tempSocket,dispatch,saveUnreadNewMsg,username);
                    return () => {  
                         tempSocket.disconnect();
                    }
            }
        },[username])
    useEffect(() => {
        // if(!usernameSlice.username || !usernameSlice.userid){
        //     navigate("/")
        // }
    console.log("Homepage :  ",activeChatId)
    dispatch(setActiveChatId({id:-1,username:""}))

        window.addEventListener("resize",()=>{
            setInnerW(window.innerWidth);
        })
        innerW =window.innerWidth;
        //to check if user is logged ino or not 
        axios({
            method: "POST",
            url: "/api/v1/login/isauthenticated",
            withCredentials: true,
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem("secret")}`
            }
        }).then((response)=>{
            console.log(response);
            if(response.data && response.data.isAuthenticated){
                if(!usernameSlice.userid){
                    dispatch(setUsername({
                        username : response.data.username,
                        userid: response.data.userid
                    }))
                    
                }
            }else{
                navigate("/")
            }
        }).catch((error)=>{
            // console.log(error)
            //if error then response.status is 403 or 404 so access denied , and redirected to login page
            navigate("/")
        })

        axios({
            method: "GET",
            url: "/api/v1/contact/saved",
            withCredentials: true,
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem("secret")}`
            }
        }).then((response)=>{
            // console.log(response);
            dispatch(setContact({contacts:response.data}));
        })
    }, [])

    if(!socket && innerW<=700)return(<></>);//if innerw is small then socket init is must
    return (
        <>
        <Provider store={store}>
            <section className="flex  w-full   h-screen bg-primary-green py-2   ">
                {innerW<=700 ? 
                <div className="w-screen  max-h-screen">
                <Navbar/>
                <LeftSideSection/>
        </div> : <div className="w-1/3  max-h-screen">
                        <Navbar/>
                        <LeftSideSection/>
                </div> }
                {innerW>700 ? <div className="w-2/3 ">
                    <RightSideSection />
                </div> : "" }
            </section>
        </Provider>
        </>
    )
}

export default HomePage

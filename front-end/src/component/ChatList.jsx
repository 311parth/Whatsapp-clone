import React,{useState,useEffect,useRef} from 'react'
import {useDispatch,useSelector} from "react-redux"
import { setActiveChatId } from '../store/activeChatIdSlice';
import { useNavigate ,useLocation} from "react-router-dom";
import {setVisited} from "../store/visitedContacts"
import getStoreState from  "../helper/getStoreState.js"
import axios from 'axios';

function ChatList(props) {

    
    const dispatch = useDispatch();
    var contactsSlice = useSelector((state)=>state.contactsSlice)
    var activeChatInfo=-1;
    const navigate = useNavigate();
    const [innerW,setInnerW] = useState();
    const LoggedusernameSlice = useSelector((state)=>state.usernameSlice);

    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        if(!LoggedusernameSlice || !LoggedusernameSlice.username){
            return;
        }
        const fetchProfileImage = async () => {
            console.log(LoggedusernameSlice);
          try {
            const response = await axios.get(`/api/v1/profile/profileImg/${props.ChatListUsername}`, {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("secret")}`,
              },
              responseType: 'blob', // Set the response type to blob
            })
            setImageUrl(URL.createObjectURL(response.data));
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchProfileImage();
      }, [LoggedusernameSlice]);

    window.addEventListener("resize",()=>{
        setInnerW(window.innerWidth);   
    })
    useEffect(() => {
        setInnerW(window.innerWidth);
    }, [])
    const openChat = ()=>{
        activeChatInfo = contactsSlice.contacts.find(contactObj => contactObj.username===props.ChatListUsername);
        // console.log(activeChatInfo)
        if(activeChatInfo && activeChatInfo.userid){
            dispatch(setActiveChatId({id: activeChatInfo.userid,username: props.ChatListUsername}))
        }else{
            //TODO: error message
        }
        // console.log(activeChatId,props.ChatListId)
        // console.log(activeChatIdRef);
        if(innerW<=700){
            navigate(`/chat/${getStoreState().activeChatIdSlice.id}`)
        }
    }
    
    return (
        <>
            <div className="m-0  ChatList container flex flex-row items-center h-16   cursor-pointer hover:text-primary-green hover:bg-primary-light-gray " onClick={openChat}>
                <div className="chatListLeft mx-4  w-1/12 min-w-fit">
                    {/* <img src="/placeholder200_200.svg" alt="" className="w-10 h-10 rounded-full"/> */}
                    {imageUrl && <img src={imageUrl} alt="Profile Image" className="w-10 h-10 rounded-full"/>}

                </div>
                <div className="chatListCenter w-11/12 space-y-1">
                    <div className="chatListcenterTop text-myMd font-myMedium" >
                        {props.ChatListUsername} {props.ChatListId}  {!props.saved ? "[unsaved]": "" }
                    </div>
                    <div className="chatListcenterBottom text-mySm text-primary-dark-gray ">
                        centerBottom
                    </div>
                </div>
                <div className="chatListRight text-sm w-2/12 text-primary-dark-gray ">
                    9:30
                </div>
            </div>
        </>
    )
}

export default ChatList

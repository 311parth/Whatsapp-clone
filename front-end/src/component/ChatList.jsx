import React from 'react'
import {useDispatch,useSelector} from "react-redux"
import { setActiveChatId } from '../store/activeChatIdSlice';
function ChatList(props) {
    // const activeChatId = useSelector((state)=>state)
    // console.log(activeChatId)
    const dispatch = useDispatch();
    const activeChatId = useSelector((state)=>state)
    const openChat = ()=>{
        // console.log(activeChatId,props.ChatListId)
        dispatch(setActiveChatId(props.ChatListId))
        // console.log(activeChatId,props.ChatListId)
    }
    return (
        <>
            <div className="m-0  ChatList container flex flex-row items-center h-16   cursor-pointer hover:text-primary-green hover:bg-primary-light-gray " onClick={openChat}>
                <div className="chatListLeft mx-3  w-1/12">
                    <img src="/placeholder200_200.svg" alt="" className="w-10 h-10 rounded-full"/>
                </div>
                <div className="chatListCenter w-10/12 space-y-1">
                    <div className="chatListcenterTop text-myMd font-myMedium" >
                        centerTop {props.ChatListId}
                    </div>
                    <div className="chatListcenterBottom text-mySm text-primary-dark-gray ">
                        centerBottom
                    </div>
                </div>
                <div className="chatListRight text-sm w-1/12 text-primary-dark-gray ">
                    9:30
                </div>
            </div>
        </>
    )
}

export default ChatList

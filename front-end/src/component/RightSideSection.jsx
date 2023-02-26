import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import MessageBox from './MessageBox';

function RightSideSection() {

    const activeChatId = useSelector((state)=>state.activeChatIdSlice);
    console.log("RightSideSection :  ",activeChatId)

    var isDefault =0;
    function getDefaultRightContainer() {
        return(
            <div className="rightSideDefaultContainer flex flex-col h-full justify-center items-center  text-primary-dark-gray">
                    {activeChatId.id}
                    <span className="text-3xl text-black font-Helvetica-light" >Chat Messaging App</span>
                    <p className="pt-1 font-Helvetica text-sm " >Send and receive messages without keeping your phone online.</p>
                </div>
        )
    }
    function getChatRightContainer() {
        return(
            <div className="rightSideChatContainer bg-slate-200  h-full w-full ">
                <div className="topChatNav h-16  w-full bg-primary-light-gray flex  items-center pl-4 cursor-pointer">
                    <img src="/placeholder200_200.svg" className="w-10 h-10 rounded-full "/>
                    <div className="chatNavNameSection flex flex-col space-y-0.5 pl-2  w-full py-2 ">
                        <span className="chatUserName text-myMd ">Username : {activeChatId.id}</span>
                        <span className="chatUserStatus text-xs text-primary-dark-gray">Online</span>
                    </div>
                    <div className="text-primary-dark-gray  ">
                        <ul className="flex pr-6">
                            <i  className="material-icons mx-4 hover:text-primary-green">search</i>
                            <i  className="material-icons mx-4 hover:text-primary-green">more_vert</i>
                        </ul>
                    </div>
                </div>
                <div className="chatContainer h-vh85 p-2">
                    <div style={{height:"92%"}} className="chatMainContainer overflow-y-scroll scrollbar w-full" >
                        <MessageBox msgId={1} isLeft={0}/><br/>
                        <MessageBox msgId={2} isLeft={1}/><br/>
                        <MessageBox msgId={3} isLeft={0}/><br/>
                        <MessageBox msgId={4} isLeft={1}/><br/>
                        <MessageBox msgId={5} isLeft={0}/><br/>
                        <MessageBox msgId={6} isLeft={1}/><br/>
                        <MessageBox msgId={7} isLeft={0}/><br/>
                        <MessageBox msgId={8} isLeft={1}/><br/>
                        <MessageBox msgId={9} isLeft={0}/><br/>
                        <MessageBox msgId={10} isLeft={0}/><br/>
                        <MessageBox msgId={11} isLeft={1}/><br/>
                        <MessageBox msgId={12} isLeft={0}/><br/>
                        <MessageBox msgId={13} isLeft={1}/><br/>
                        <MessageBox msgId={14} isLeft={0}/><br/>
                        <MessageBox msgId={15} isLeft={1}/><br/>
                        <MessageBox msgId={16} isLeft={0}/><br/>
                        <MessageBox msgId={17} isLeft={0}/><br/>
                        <MessageBox msgId={18} isLeft={0}/><br/>
                        <MessageBox msgId={19} isLeft={1}/><br/>
                        <MessageBox msgId={20} isLeft={1}/><br/>
                        <MessageBox msgId={21} isLeft={0}/><br/>

                    </div>
                    <div style={{height:"8%"}} className="chatInputContainer w-full h-16 bottom-0 flex bg-primary-light-gray justify-center items-center space-x-2 " >
                        <input className="w-10/12 h-10 p-2 text-sm rounded-full text-primary-dark-gray" type="text" name="" id="" placeholder="Type a message"/>
                        <button  className="w-11 h-10 px-2 pt-2  rounded-full text-primary-dark-gray   hover:text-primary-light-gray hover:bg-primary-green  focus:text-primary-light-gray focus:bg-primary-green" ><i className="material-icons  ">send</i></button>
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

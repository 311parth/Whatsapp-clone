import React from 'react'
import ChatList from './ChatList';

// import {Provider} from "react-redux"
// import store from '../store/store'
function LeftSideSection() {    
    return (
        <>
            {/* <Provider store={store}> */}
                <div id="leftSectionTop" className="leftSide py-2   bg-white  items-center  max-h-screen overflow-y-scroll scrollbar h-vh85" >
                    <div className=" container  px-4 flex items-center text-sm h-10  bg-primary-light-gray rounded-3xl ">
                        <i  style={{fontSize:"1.2rem"}} className=" material-icons ml-4 stroke-primary-light-gray  text-primary-dark-gray" >search</i>
                        <input type="text" name="" id="" placeholder="Search" className=" bg-primary-light-gray w-10/12 h-8  rounded-xl px-5 py-2 text-gray-500 focus:outline-none "/>
                    </div>
                    <div className="chatListContainer mt-2 w-full border-t-2 border-gray-3=200 ">

                        <ChatList ChatListId="1" />
                        <ChatList ChatListId="2"/>
                        <ChatList ChatListId="3"/>
                        <ChatList ChatListId="4"/>
                        <ChatList ChatListId="5"/>
                        <ChatList ChatListId="6"/>
                        <ChatList ChatListId="7"/>
                        <ChatList ChatListId="8"/>
                        <ChatList ChatListId="9"/>
                        <ChatList ChatListId="10"/>
                        <ChatList ChatListId="11"/>
                        <ChatList ChatListId="12"/>
                        <ChatList ChatListId="13"/>
                        <ChatList ChatListId="14"/>
                        <ChatList ChatListId="15"/>
                        <ChatList ChatListId="16"/>
                        <ChatList ChatListId="18"/>
                        <ChatList ChatListId="19"/>
                        <ChatList ChatListId="20"/>
                        <ChatList ChatListId="21"/>
                        <ChatList ChatListId="22"/>
                    </div>
                </div>


            {/* </Provider> */}
        </>
    )
}

export default LeftSideSection

import React from 'react'
import ChatList from './ChatList';

// import {Provider} from "react-redux"
// import store from '../store/store'
function LeftSideSection() {    
    return (
        <>
            {/* <Provider store={store}> */}
                <div id="leftSectionTop" className="leftSide py-2   bg-white  items-center  max-h-screen overflow-y-scroll scrollbar " style={{
                    height:"89vh"
                }} >
                    <div className=" container  px-4 flex items-center text-sm h-10  bg-primary-light-gray rounded-3xl ">
                        <i  style={{fontSize:"1.2rem"}} className=" material-icons ml-4 stroke-primary-light-gray  text-primary-dark-gray" >search</i>
                        <input type="text" name="" id="" placeholder="Search" className=" bg-primary-light-gray w-10/12 h-8  rounded-xl px-5 py-2 text-gray-500 focus:outline-none "/>
                    </div>
                    <div className="chatListContainer mt-2 w-full border-t-2 border-gray-3=200 ">
                        <ChatList ChatListUsername={"User "} ChatListId={1} />
                        <ChatList ChatListUsername={"User "} ChatListId={2}/>
                        <ChatList ChatListUsername={"User "} ChatListId={3}/>
                        <ChatList ChatListUsername={"User "} ChatListId={4}/>
                        <ChatList ChatListUsername={"User "} ChatListId={5}/>
                        <ChatList ChatListUsername={"User "} ChatListId={6}/>
                        <ChatList ChatListUsername={"User "} ChatListId={7}/>
                        <ChatList ChatListUsername={"User "} ChatListId={8}/>
                        <ChatList ChatListUsername={"User "} ChatListId={9}/>
                        <ChatList ChatListUsername={"User "} ChatListId={10}/>
                        <ChatList ChatListUsername={"User "} ChatListId={11}/>
                        <ChatList ChatListUsername={"User "} ChatListId={12}/>
                        <ChatList ChatListUsername={"User "} ChatListId={13}/>
                        <ChatList ChatListUsername={"User "} ChatListId={14}/>
                        <ChatList ChatListUsername={"User "} ChatListId={15}/>
                        <ChatList ChatListUsername={"User "} ChatListId={16}/>
                        <ChatList ChatListUsername={"User "} ChatListId={18}/>
                        <ChatList ChatListUsername={"User "} ChatListId={19}/>
                        <ChatList ChatListUsername={"User "} ChatListId={20}/>
                        <ChatList ChatListUsername={"User "} ChatListId={21}/>
                        <ChatList ChatListUsername={"User "} ChatListId={22}/>
                    </div>
                </div>

            {/* </Provider> */}
        </>
    )
}

export default LeftSideSection

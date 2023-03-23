import React from 'react'
import ChatList from './ChatList';
import {useDispatch,useSelector} from "react-redux"

// import {Provider} from "react-redux"
// import store from '../store/store'
function LeftSideSection() {   
    const dispatch = useDispatch(); 
    const contactsSlice = useSelector((state)=>state.contactsSlice)
    const contacts = contactsSlice.contacts;
    // console.log(contacts)
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
                        {
                            contacts.map((ele,index)=>{
                                return <ChatList key={ele.username} ChatListUsername={ele.username} ChatListId={index} />
                            })
                        }
                    </div>
                </div>

            {/* </Provider> */}
        </>
    )
}

export default LeftSideSection

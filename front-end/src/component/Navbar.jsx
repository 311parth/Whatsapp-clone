import React,{useRef} from 'react'
import PopUpBox from './PopUpBox';
import PopUpNewContact from './PopUpNewContact';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {pushContact} from "../store/contactsSlice"
import { useDispatch } from 'react-redux';

function Navbar() {
    
    const email = useRef();
    const username = useRef();
    const dispatch = useDispatch();
    function navMore() {
        // console.log("navMore click")
        var navMoreOption = document.getElementById("navMoreOption");
        navMoreOption.classList.toggle("hidden")
    }
    function removeNavMore(){
        // console.log("navMore click")
        var navMoreOption = document.getElementById("navMoreOption");
        navMoreOption.classList.add("hidden")
    }
    function NewContactModalContent() {
        return(
            <>
                <div className="flex items-center justify-center">
                <form action="" onSubmit={(e)=>{
                    e.preventDefault()
                    axios({
                        method: "POST",
                        url: "/api/v1/contact/addNew",
                        data: {
                            email: email.current.value,
                            username: username.current.value,
                        },headers:{
                            Authorization:`Bearer ${sessionStorage.getItem("secret")}`
                        },
                        withCredentials: true
                    }).then((response) => {
                        if(!response || !response.data){
                            toast.error("Something went wrong try Again")
                            return
                        }
                        if(!response.data.found){
                            if(response.data.duplicate){
                                toast.error("User Already exist")
                            }else{
                                toast.error("User not found!!!  Email or username might be incorrect")
                            }
                        }
                        else{
                            toast.success("User Founded");
                            // console.log(response.data)
                            dispatch(pushContact({username:response.data.username,email:response.data.email,userid:response.data.userid }));
                        }
                    }).catch((error)=>{
                        toast.error("Something went wrong try Again")
                    })
                }} className=" pb-5 space-y-5 [&>li]:my-3  [&>li]:flex [&>li]:items-center [&>li>input]:text-myMd [&>li>input]:p-2 ">
                            <li>
                                <label className="w-2/6">Username</label>
                                <input required className="loginInput border-b-2 border-black mx-2 bg-primary-light-gray" id="loginpw" name="password" type="text" placeholder="Username" ref={username}/>
                            </li>
                            <li>
                                <label  className="w-2/6">User's Email</label>
                                <input required  autoComplete="new-password" className="loginInput border-b-2 border-black mx-2 bg-primary-light-gray" id="loginEmail" name="Email" type="email" placeholder="Email" ref={email}/>
                            </li>
                            <li>    
                                <input className="loginBtn  mx-auto p-1 border-2 rounded-lg cursor-pointer  border-primary-dark-gray bg-primary-light-gray text-black hover:bg-primary-green hover:text-primary-light-gray focus:bg-primary-green   focus:text-primary-light-gray " type="submit" value="Add" />
                            </li>
                    </form>   
                </div>
                <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />

            </>
        )
}
    
    // console.log(modalContant)
    return (
        <>
            <nav>
                <div className="bg-primary-light-gray flex list-none justify-start w-full  items-center">
                    <ul className="p-3 w-2/5  flex items-center px-8">
                        <img src="/placeholder200_200.svg" alt="" className="w-10 h-10 rounded-full"/>
                    </ul>
                    <ul className="w-3/5 px-3  h-full flex justify-around items-center  hover:cursor-pointer " >
                        <li>
                            <i  className="material-icons text-primary-dark-gray  IconSize-lg   hover:text-primary-green">groups</i>
                        </li>
                        <li>
                            <i  className="material-icons text-primary-dark-gray  IconSize-md   hover:text-primary-green">donut_large</i>
                        </li>
                        <li>
                            <i  className="material-icons text-primary-dark-gray  IconSize-md   hover:text-primary-green">chat</i>
                        </li>
                        <li className="relative">
                            <i  className="material-icons text-primary-dark-gray  IconSize-md   hover:text-primary-green" onClick={navMore}>more_vert</i>
                            <ul className="bg-primary-light-gray  h-fit w-40 min-w-fit absolute   hidden  right-0 mt-4 shadow-2xl border-2" id="navMoreOption" onClick={removeNavMore}>
                                <li className="text-sm  py-2.5 px-5 hover:bg-white"  onClick={()=>{
                                    document.getElementById("newContactModal").classList.remove("hidden");
                                }}>New Contact</li>
                                <li className="text-sm  py-2.5 px-5 hover:bg-white">Profile </li>
                                <li className="text-sm  py-2.5 px-5 hover:bg-white">Settings</li>
                                <li className="text-sm  py-2.5 px-5 hover:bg-white">Logout</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            {/* <PopUpNewContact/> */}
            <PopUpBox header={"New contact"} content={<NewContactModalContent/>} isModalSubmitBtn={false} submitButtonText={"Ok"} />
            </nav>
        </> 
    )
}

export default Navbar

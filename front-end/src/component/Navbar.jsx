import React,{useRef,useEffect,useState} from 'react'
import PopUpBox from './PopUpBox';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {pushContact} from "../store/contactsSlice"
import { useDispatch ,useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom"

function Navbar() {
    
    const navigate = useNavigate();
    const email = useRef();
    const username = useRef();
    const dispatch = useDispatch();
    const LoggedusernameSlice = useSelector((state)=>state.usernameSlice);
    const [imageUrl, setImageUrl] = useState('');
    useEffect(() => {
        if(!LoggedusernameSlice || !LoggedusernameSlice.username){
            return;
        }
        const fetchProfileImage = async () => {
            console.log(LoggedusernameSlice);
          try {
            const response = await axios.get(`/api/v1/profile/profileImg/${LoggedusernameSlice?.username}`, {
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
                        if(!response || !response.data || response.status===500){
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
                            dispatch(pushContact({username:response.data.username,email:response.data.email,userid:response.data.userid,saved:1 }));
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
                autoClose={3000}
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

    function logout() {
        console.log("loggin out")
        axios({
            method:"POST",
            url : "/api/v1/logout",
            data:{

            },
            withCredentials:true,
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem("secret")}`
            }
        }).then((response)=>{
            if(response && response.data && response.data.logoutAck){
                console.log(response.data);
                sessionStorage.removeItem("secret")
                navigate("/");
                
            }
        })
    }

    
    // console.log(modalContant)
    return (
        <>
            <nav>
                <div className="bg-primary-light-gray flex list-none justify-start w-full  items-center">
                    <ul className="p-3 w-2/5  flex items-center px-8">
                        {imageUrl && <img src={imageUrl} alt="Profile Image" className="w-10 h-10 rounded-full"/>}
                    </ul>
                    <ul className="w-3/5 px-3  h-full flex justify-around items-center  hover:cursor-pointer [&>li]:flex " >
                        {/* <li>
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
                                <li  className="text-sm w-full py-2.5 px-5 hover:bg-white" onClick={logout}>Logout</li>
                            </ul>
                        </li> */}
                        <li>
                            <i  className="material-icons  text-primary-dark-gray  IconSize-lg   hover:text-primary-green" title="View Profile">account_circle</i>
                        </li>
                        <li>
                            <i  className="material-icons text-primary-dark-gray  IconSize-lg   hover:text-primary-green" title="New Contact" onClick={()=>{
                                    document.getElementById("newContactModal").classList.remove("hidden");
                                }}>person_add</i>
                        </li>
                        <li>
                            <i  className="material-icons text-primary-dark-gray  IconSize-lg   hover:text-primary-green" title="Logout" onClick={logout}>logout</i>
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

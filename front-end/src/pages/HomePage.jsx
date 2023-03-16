import React,{useState,useEffect} from 'react'
import LeftSideSection from '../component/LeftSideSection'
import Navbar from '../component/Navbar'
import RightSideSection from '../component/RightSideSection'
import { Provider } from 'react-redux';
import store from "../store/store"
import {useDispatch,useSelector} from "react-redux"
import { useNavigate} from "react-router-dom";
import axios from 'axios';

function HomePage() {
    const activeChatId = useSelector((state)=>state.activeChatIdSlice);
    // console.log("Homepage :  ",activeChatId)
    const navigate = useNavigate();
    
    var [innerW,setInnerW] = useState();
    innerW =window.innerWidth;
    useEffect(() => {
    console.log("Homepage :  ",activeChatId)
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
        }).catch((error)=>{
            //if error then response.status is 403 or 404 so access denied , and redirected to login page
            navigate("/")
        })
        axios({
            method: "GET",
            url: "/api/v1/test",
            withCredentials: true,
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem("secret")}`
            }
        }).then((response)=>{
            console.log(response);
        })
    }, [])

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
                    <RightSideSection/>
                </div> : "" }
            </section>
        </Provider>
        </>
    )
}

export default HomePage

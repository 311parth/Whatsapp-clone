import React,{useState,useEffect} from 'react'
import LeftSideSection from '../component/LeftSideSection'
import Navbar from '../component/Navbar'
import RightSideSection from '../component/RightSideSection'
import { Provider } from 'react-redux';
import store from "../store/store"
import {useDispatch,useSelector} from "react-redux"

function HomePage() {
    const activeChatId = useSelector((state)=>state.activeChatIdSlice);
    // console.log("Homepage :  ",activeChatId)
    
    var [innerW,setInnerW] = useState();
    innerW =window.innerWidth;
    useEffect(() => {
    console.log("Homepage :  ",activeChatId)
        window.addEventListener("resize",()=>{
            setInnerW(window.innerWidth);
        })
        innerW =window.innerWidth;
        // console.log(innerW);
    }, [])
    return (
        <>
        <Provider store={store}>
            <section className="flex  h-screen bg-primary-green py-2   ">
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

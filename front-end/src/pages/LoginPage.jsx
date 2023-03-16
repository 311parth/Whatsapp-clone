import React,{useEffect, useState,useRef} from 'react'
import {Link} from 'react-router-dom'
import { useLocation ,useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function LoginPage() {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if(location.state &&  location.state.fromsignup ){
            toast.success("Signup successfull Now login")
        }
    }, [])

    const email = useRef();
    const password = useRef();
    const [errormsg,setErrormsg] = useState(2);

    function loginSubmit(e) {
        e.preventDefault();
        axios({
            method: "POST",
            url: "/api/v1/login",
            data: {
                email: email.current.value,
                password: password.current.value,
            },
            withCredentials: true
        }).then((response) => {
            console.log(response)
            if(response && response.data && response.data.authToken){
                sessionStorage.setItem("secret",response.data.authToken)
            }
            if(!response.data.logged){
                toast.error("Login Email or password incorrect")
            }else{
                navigate("/home");
            }
        })
    }
        return (
            <>
            <div className="loginFormContainer flex justify-center items-center text-primary-green border-2 text-lg border-primary-dark-gray h-screen ">
                <div className="loginFormMain w-96 list-none bg-primary-light-gray p-4">
                    <h3 className="text-primary-dark-gray mx-auto w-fit ">Login</h3>
                    <hr className=" border-0.5 border-primary-green"/>
                    {errormsg === 1 ? <h1 className="text-red-500">Wrong username password</h1> : ""}    
                    <form onSubmit={(e)=>{loginSubmit(e)}} className="space-y-5  px-2 [&>li]:my-3   [&>li]:flex [&>li]:items-center [&>li>input]:text-myMd [&>li>input]:p-2 "  >
                        <li >
                            <label className="w-4/6">Email</label>
                            <input  required  autoComplete="new-password" className="loginInput border-b-2 border-black mx-2 bg-primary-light-gray"  name="Email" type="email" placeholder="Email" ref={email}/>
                        </li>
                        <li>
                            <label className="w-4/6">Password</label>
                            <input  required  autoComplete="new-password" className="loginInput border-b-2 border-black mx-2 bg-primary-light-gray"  name="password" type="password" placeholder="Password" ref={password} />
                        </li>
                        <li>    
                            <input className="loginBtn  mx-auto p-1 border-2 rounded-lg cursor-pointer  border-primary-dark-gray bg-primary-light-gray text-primary-green hover:bg-primary-green hover:text-primary-light-gray" type="submit" value="Login" />
                        </li>
                        <li id="login-to-register-li">
                            Haven't register yet ? &nbsp; <Link to={"/signup"} className="text-primary-dark-gray"> Register</Link>
                        </li>
                    </form>
                </div>
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

export default LoginPage

import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
function SignupPage() {
    const navigate = useNavigate();

    const email = useRef();
    const fullname = useRef();
    const username = useRef();
    const password = useRef();
    const profilePicture = useRef();
    function signupSubmit(e) {
        e.preventDefault();
        axios({
            method: "POST",
            url: "/api/v1/signup",
            data: {
                email: email.current.value,
                fullname: fullname.current.value,
                username: username.current.value,
                password: password.current.value,
            },
            // headers: { 
            //     'content-type': 'application/json'
            // },
            withCredentials: true
        }).then((response) => {
            console.log(response)
            if (response.data.email) {
                toast.error("Email is already registered")
            } else if (response.data.username) {
                toast.error("Username is already registered")
            } else if (response.data.signup) {
                toast.success("Signup successfull")
                navigate("/",{
                    state:{
                        fromsignup : 1
                    }
                })
            }
        })
    }


    return (
        <>
            <div className="signupFormContainer flex min-w-fit max-h-screen justify-center items-center text-primary-green  text-lg  h-screen ">
                <div className="loginFormMain w-96   list-none bg-primary-light-gray p-4">
                    <h3 className="text-primary-dark-gray mx-auto w-fit ">Signup</h3>
                    <hr className=" border-0.5 border-primary-green" />
                    <form onSubmit={(e) => { signupSubmit(e) }} className="space-y-5 px-2   [&>li]:flex [&>li]:items-center  [&>li]:my-3   [&>li>input]:text-myMd [&>li>input]:p-2  [&>li>input]:border-b-2 [&>li>input]:border-black"  >
                        {/* TODO: add required  */}
                        <li>
                            <label className="w-4/6">Email</label>
                            <input required autoComplete="new-password" className="loginInput  border-black mx-2 bg-primary-light-gray" id="signEmail" name="Email" type="email" placeholder="Email" ref={email} />
                        </li>
                        <li>
                            <label className="w-4/6">Full Name</label>
                            <input required autoComplete="new-password" className="loginInput  border-black mx-2 bg-primary-light-gray" id="signupName" name="username" type="text" placeholder="Full Name" ref={fullname} />
                        </li>
                        <li>
                            <label className="w-4/6">Username</label>
                            <input required autoComplete="new-password" className="loginInput  border-black mx-2 bg-primary-light-gray" id="signUsername" name="username" type="text" placeholder="Username" ref={username} />
                        </li>
                        <li>
                            <label className="w-4/6">Password</label>
                            <input required className="loginInput  border-black mx-2 bg-primary-light-gray" id="signPw" name="password" type="password" placeholder="Password" ref={password} />
                        </li>
                        <li>
                            <label className="w-4/6">Profile Picture</label>
                            <input className="loginInput mx-2   bg-primary-light-gray" id="signupProfilePicture" name="password" type="file" ref={profilePicture} />
                        </li>
                        <li>
                            <input className="loginBtn  mx-auto p-1 border-2 rounded-lg cursor-pointer  border-primary-dark-gray bg-primary-light-gray text-primary-green hover:bg-primary-green hover:text-primary-light-gray" type="submit" value="Signup" />
                        </li>
                        <li id="login-to-register-li">
                            Already registered ? &nbsp; <Link to={"/"} className="text-primary-dark-gray">Login</Link>
                        </li>
                    </form>
                </div>
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

export default SignupPage

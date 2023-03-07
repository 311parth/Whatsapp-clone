import React,{useState} from 'react'
import {Link} from 'react-router-dom'


function LoginPage() {
    const [errormsg,setErrormsg] = useState(2);
        return (
            <>
            <div className="loginFormContainer flex justify-center items-center text-primary-green border-2 text-lg border-primary-dark-gray h-screen ">
                <div className="loginFormMain w-96 list-none bg-primary-light-gray p-4">
                    <h3 className="text-primary-dark-gray mx-auto w-fit ">Login</h3>
                    <hr className=" border-0.5 border-primary-green"/>
                    {errormsg === 1 ? <h1 className="text-red-500">Wrong username password</h1> : ""}    
                    <form className="space-y-5  px-2 [&>li]:my-3   [&>li]:flex [&>li]:items-center [&>li>input]:text-myMd [&>li>input]:p-2 "  >
                        <li >
                            <label className="w-4/6">Email</label>
                            <input  required  autoComplete="new-password" className="loginInput border-b-2 border-black mx-2 bg-primary-light-gray" id="loginEmail" name="Email" type="email" placeholder="Email" onChange={(e)=>{
                                Email = e.target.value
                            }}/>
                        </li>
                        <li>
                            <label className="w-4/6">Username</label>
                            <input  required  autoComplete="new-password" className="loginInput border-b-2 border-black mx-2 bg-primary-light-gray" id="loginEmail" name="username" type="text" placeholder="Username" onChange={(e)=>{
                                Username = e.target.value
                            }} />
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
            </>
        )


}

export default LoginPage

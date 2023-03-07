import React from 'react'
import PopUpNewContact from '../component/PopUpNewContact'
import {Link} from 'react-router-dom'
function SignupPage() {
    return (
        <>
            <div className="signupFormContainer flex min-w-fit max-h-screen justify-center items-center text-primary-green  text-lg  h-screen ">
                    <div className="loginFormMain w-96   list-none bg-primary-light-gray p-4">
                        <h3 className="text-primary-dark-gray mx-auto w-fit ">Signup</h3>
                        <hr className=" border-0.5 border-primary-green"/>
                        <form  className="space-y-5 px-2   [&>li]:flex [&>li]:items-center  [&>li]:my-3   [&>li>input]:text-myMd [&>li>input]:p-2  [&>li>input]:border-b-2 [&>li>input]:border-black"  >
                            <li>
                                <label className="w-4/6">Email</label>
                                <input  required  autoComplete="new-password" className="loginInput  border-black mx-2 bg-primary-light-gray" id="signEmail" name="Email" type="email" placeholder="Email" onChange={(e)=>{
                                    Email = e.target.value
                                }} />
                            </li>
                            <li>
                                <label className="w-4/6">Full Name</label>
                                <input required autoComplete="new-password" className="loginInput  border-black mx-2 bg-primary-light-gray" id="signupName" name="username" type="text" placeholder="Full Name" onChange={(e) => {
                                    Fullname = e.target.value
                                }} />
                            </li>
                            <li>
                                <label className="w-4/6">Username</label>
                                <input  required  autoComplete="new-password" className="loginInput  border-black mx-2 bg-primary-light-gray" id="signUsername" name="username" type="text" placeholder="Username" onChange={(e)=>{
                                    Username = e.target.value
                                }} />
                            </li>
                            <li>
                                <label className="w-4/6">Password</label>
                                <input required className="loginInput  border-black mx-2 bg-primary-light-gray" id="signPw" name="password" type="password" placeholder="Password" onChange={(e)=>{
                                    pw = e.target.value
                                }}/>
                            </li>
                            <li>
                                <label className="w-4/6">Profile Picture</label>
                                <input className="loginInput mx-2   bg-primary-light-gray" id="signupProfilePicture" name="password" type="file" placeholder="Password"/>
                            </li>
                            <li>    
                                <input className="loginBtn  mx-auto p-1 border-2 rounded-lg cursor-pointer  border-primary-dark-gray bg-primary-light-gray text-primary-green hover:bg-primary-green hover:text-primary-light-gray" type="submit" value="Signup" />
                            </li>
                            <li id="login-to-register-li">
                                Already registered ? &nbsp; <Link to={"/login"} className="text-primary-dark-gray">Login</Link>
                            </li>
                        </form>
                    </div>
                </div>
        </>
    )
}

export default SignupPage

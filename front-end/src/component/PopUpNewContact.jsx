import React from 'react'

function PopUpNewContact(props) {
    function closeNewContactPopUp() {
        var PopUpNewContactId = document.getElementById("PopUpNewContact");
        PopUpNewContactId && PopUpNewContactId.classList &&  PopUpNewContactId.classList.add("hidden")
    }
    return (
        <>
            <div id="PopUpNewContact" className=" w-screen h-fit absolute items-center flex-col bg-sec-light-green  mx-auto  " style={{
                // width:"91rem",
                // height:"40rem"
            }}>
                {/* <h3>PopupNewcontact</h3> */}
                    <div className="flex justify-between w-full px-5 py-1">
                        <button className="flex items-center text-xl hover:text-primary-green  active:text-primary-green" onClick={closeNewContactPopUp}>
                                <span className="material-icons ">
                                arrow_back
                                </span>
                                <span>Back</span>
                        </button>
                        <button className="flex items-center text-xl  hover:text-primary-green  active::text-primary-green" onClick={closeNewContactPopUp}>
                                <span className="material-icons ">
                                close
                                </span>
                        </button>
                    </div>
                    <div className="flex flex-col justify-center items-center ">
                     <form action="" className="pb-5 space-y-5 [&>li]:my-3  [&>li]:flex [&>li]:items-center [&>li>input]:text-myMd [&>li>input]:p-2 ">
                            <li>
                                <label className="w-4/6">Username</label>
                                <input required className="loginInput border-b-2 border-black mx-2 bg-primary-light-gray" id="loginpw" name="password" type="text" placeholder="Username" onChange={(e)=>{
                                    pw = e.target.value
                                }}/>
                            </li>
                            <li>
                                <label required className="w-4/6">User's Email</label>
                                <input   autoComplete="new-password" className="loginInput border-b-2 border-black mx-2 bg-primary-light-gray" id="loginEmail" name="Email" type="email" placeholder="Email" onChange={(e)=>{
                                    Email = e.target.value
                                }} />
                            </li>
                            <li>    
                                <input className="loginBtn  mx-auto p-1 border-2 rounded-lg cursor-pointer  border-primary-dark-gray bg-primary-light-gray text-black hover:bg-primary-green hover:text-primary-light-gray focus:bg-primary-green   focus:text-primary-light-gray " type="submit" value="Add" />
                            </li>
                    </form>   
                    </div>
            </div>
        </>
    )
}

export default PopUpNewContact

import React from 'react'
import PopUpNewContact from './PopUpNewContact';

function Navbar() {
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
                                <li className="text-sm  py-2.5 px-5 hover:bg-white"><button>New Contact</button></li>
                                <li className="text-sm  py-2.5 px-5 hover:bg-white"><button>Profile </button></li>
                                <li className="text-sm  py-2.5 px-5 hover:bg-white"><button>Settings</button></li>
                                <li className="text-sm  py-2.5 px-5 hover:bg-white"><button>Logout</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </> 
    )
}

export default Navbar

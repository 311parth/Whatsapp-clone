import React from 'react'

function Navbar() {
    return (
        <>
            <nav className="bg-primary-light-gray flex list-none justify-start w-full  items-center">
                <ul className="p-3 w-4/5  flex items-center px-8">
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
                    <li> 
                        <i  className="material-icons text-primary-dark-gray  IconSize-md   hover:text-primary-green">more_vert</i>
                    </li>

                </ul>
            </nav>
        </>
    )
}

export default Navbar

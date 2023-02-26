import React from 'react'
import LeftSideSection from '../component/LeftSideSection'
import Navbar from '../component/Navbar'
import RightSideSection from '../component/RightSideSection'
import { Provider } from 'react-redux';
import store from "../store/store"
function Home() {
    return (
        <>
        <Provider store={store}>
            <section className="flex bg-primary-green py-5 px-10  ">
                <div className="w-1/3 max-h-screen">
                        <Navbar/>
                        <LeftSideSection/>
                </div>
                <div className="w-2/3 ">
                    <RightSideSection/>
                </div>
            </section>
        </Provider>
        </>
    )
}

export default Home

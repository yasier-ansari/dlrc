import React, { useContext } from 'react'
import Header from "../components/Header"
import Footer from "../components/Footer"
import { AuthContext } from "../context/AuthContext"
import AuthHeader from "../components/AuthHeader"
import { TbLockAccessOff } from "react-icons/tb"
import { useLocation } from 'react-router-dom'

const Access = ({ error }) => {
    const { userType } = useContext(AuthContext);
    const location = useLocation();
    const errorMessage = error || location.state?.message || 'Uh oh! Looks like you wandered too far 😥, this page is currently off limits for you';

    return (
        <div className="flex flex-col w-full min-h-screen bg-white scroll-smooth">
            {
                userType === 'student' ? <Header /> : <AuthHeader val={true} />
            }
            <main className="flex grow px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 flex-col justify-center mx-auto items-center max-w-7xl w-full h-full " >
                <div className="flex flex-col items-center justify-center w-full h-full max-w-5xl ">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl" >
                        <TbLockAccessOff className=" text-[#52b788] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 -ml-1 sm:-ml-2 md:-ml-3 " />
                    </h3>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold " >Access Denied</h1>
                    <div className="text-base sm:text-lg md:text-lg lg:text-xl  py-4 sm:py-5 md:py-6 lg:py-8 font-bold flex items-center justify-center text-center mx-auto max-w-xl sm:max-w-2xl md:max-w-3xl " >
                        <p>
                            {errorMessage}
                        </p>
                    </div>
                </div>
            </main>
            {
                userType === 'student' ? <Footer /> : null
            }
        </div>
    )
}

export default Access
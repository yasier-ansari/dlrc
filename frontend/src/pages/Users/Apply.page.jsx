import React from 'react'
import AuthHeader from "../../components/AuthHeader"
import UserApplication from "../../components/UserApplication"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import UserApplicationComp from "../../components/UserApplication"

const Apply = () => {
    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
            <Header />
            <main className="flex grow w-[100%]  " >
                <UserApplicationComp />
            </main>
            <Footer />
        </div>
    )
}

export default Apply
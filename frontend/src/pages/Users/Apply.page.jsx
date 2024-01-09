import React from 'react'
import AuthHeader from "../../components/AuthHeader"
import UserApplication from "../../components/UserApplication"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import UserApplicationComp from "../../components/UserApplication"

const Apply = () => {
    return (
        <div className="">
            <Header />
            <main className="flex grow w-[100%] px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 " >
                <UserApplicationComp />
            </main>
            <Footer />
        </div>
    )
}

export default Apply
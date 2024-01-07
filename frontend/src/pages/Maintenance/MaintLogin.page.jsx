import React from 'react'
import AuthHeader from "../../components/AuthHeader"
import MaintLoginComp from "../../components/MaintLogin"

const MaintLogin = () => {
    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
            <AuthHeader />
            <main className="flex grow w-[100%]  " >
                <MaintLoginComp />
            </main>
        </div>)
}

export default MaintLogin
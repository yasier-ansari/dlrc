import React from 'react'
import MaintRegisterComp from "../../components/MaintRegister"
import AuthHeader from "../../components/AuthHeader"

const MaintRegister = () => {
    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
            <AuthHeader />
            <main className="flex grow w-[100%]  " >
                <MaintRegisterComp />
            </main>
        </div>)
}

export default MaintRegister
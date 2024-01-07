import React from 'react'
import UserRegister from "../../components/UserRegister"
import AuthHeader from "../../components/AuthHeader"

const Register = () => {
    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
            <AuthHeader />
            <main className="flex grow w-[100%]  " >
                <UserRegister />
            </main>
        </div>
    )
}

export default Register
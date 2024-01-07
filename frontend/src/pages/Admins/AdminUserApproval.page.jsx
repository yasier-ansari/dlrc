import React, { useContext } from 'react'
import AuthHeader from "../../components/AuthHeader"
import AdminUserApprovalComp from "../../components/AdminUserApproval"
import { AuthContext } from "../../context/AuthContext"
import Modal from "../../components/Modal"

const AdminUserApproval = () => {
    const { modalPopped, setModalPopped } = useContext(AuthContext)
    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
            <AuthHeader val={true} />
            {/* <main className="flex grow w-[100%]  " > */}
            {/* asdas */}
            {/* <AdminLoginComp /> */}
            <main className={`flex grow px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 flex-col justify-center mx-auto items-center max-w-7xl w-full h-full ${modalPopped ? " opacity-[0.4] " : " "} `} >
                <AdminUserApprovalComp />
            </main >
            {
                modalPopped && <Modal />
            }
            {/* </main> */}
        </div>
    )
}

export default AdminUserApproval
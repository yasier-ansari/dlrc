import React, { useContext, useEffect, useState } from 'react'
import AuthHeader from "../../components/AuthHeader"
import { AuthContext } from "../../context/AuthContext"
import Modal from "../../components/Modal"
import { useParams } from "react-router-dom"
import MaintUserApprovalComp from "../../components/MaintUserApproval"
import MaintUserReturnComp from "../../components/MaintUserReturn"

const MaintUserReturn = () => {
    const { modalPopped, setModalPopped } = useContext(AuthContext);
    const [flag, setFlag] = useState(false);
    const { id } = useParams()
    // useEffect(() => {

    // }, [flag]);
    return (
        <>
            <div className={`flex flex-col w-full ${modalPopped && " opacity-[0.2] max-w-screen max-h-screen overflow-y-auto "} min-h-screen bg-white `}>
                <AuthHeader val={true} />
                <main className={`flex grow px-6 sm:px-8 md:px-12 lg:px-20   xl:px-24 flex-col justify-center mx-auto items-center max-w-7xl w-full h-full `} >
                    <MaintUserReturnComp flag={flag} id={id} />
                </main>

            </div>
            {
                modalPopped && <Modal />
            }
        </>
    )
}

export default MaintUserReturn  
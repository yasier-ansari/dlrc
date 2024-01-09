import { useContext } from "react"
import Header from "../../components/Header"
import Modal from "../../components/Modal"
import UserProfile from "../../components/UserProfile"
import { AuthContext } from "../../context/AuthContext"

const Profile = () => {
    const { modalPopped } = useContext(AuthContext);
    return (
        <>
            <div className={`flex flex-col w-full ${modalPopped ? " opacity-[0.2] max-w-screen max-h-screen overflow-y-auto " : " w-full h-full overflow-auto"} min-h-screen bg-white `}>
                <Header />
                <main className={`flex grow px-6 sm:px-8 md:px-12 lg:px-20   xl:px-24 flex-col justify-center mx-auto items-center max-w-7xl w-full h-full `} >
                    <UserProfile />
                </main>

            </div>
            {
                modalPopped && <Modal />
            }
        </>
    )
}

export default Profile
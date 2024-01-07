import { useContext } from "react"
import Header from "../../components/Header"
import Modal from "../../components/Modal"
import UserProfile from "../../components/UserProfile"
import { AuthContext } from "../../context/AuthContext"

const Profile = () => {
    const { modalPopped } = useContext(AuthContext);
    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
            <Header />
            <main className={`flex grow px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24 flex-col justify-center mx-auto items-center max-w-7xl w-full h-full ${modalPopped ? " opacity-[0.4] " : " "} `} >
                <UserProfile />
            </main>
            {
                modalPopped && <Modal />
            }
        </div>
    )
}

export default Profile
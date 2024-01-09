import AdminRegisterComp from "../../components/AdminRegister"
import AuthHeader from "../../components/AuthHeader"

const AdminRegister = () => {
    return (
        <div className="flex flex-col w-full min-h-screen bg-white">
            <AuthHeader />
            <main className="flex grow w-[100%] px-6 sm:px-8 md:px-12 lg:px-20 xl:px-24  " >
                <AdminRegisterComp />
            </main>
        </div>)
}

export default AdminRegister